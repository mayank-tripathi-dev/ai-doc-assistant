from services.llm_service import generate_answer
from fastapi import FastAPI, UploadFile, File
from services.pdf_service import extract_text
from utils.chunker import chunk_text
from services.embedding_service import generate_embeddings
from database.qdrant import (
    create_collection,
    store_embeddings,
    search_similar_chunks,
)

from pydantic import BaseModel
import shutil
import os

app = FastAPI()

class SearchRequest(BaseModel):
    query: str

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "AI Document Assistant API "
    }

@app.on_event("startup")
async def startup():
    create_collection()


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract page-wise text
    pages = extract_text(file_path)

    all_chunks = []
    all_metadata = []

    for page in pages:
        chunks = chunk_text(page["text"])

        for chunk in chunks:
            all_chunks.append(chunk)
            all_metadata.append(
                {
                    "page": page["page"]
                }
            )

    embeddings = generate_embeddings(all_chunks)

    store_embeddings(
        all_chunks,
        embeddings,
        file.filename,
        all_metadata
    )

    return {
        "filename": file.filename,
        "pages": len(pages),
        "chunks": len(all_chunks),
        "first_chunk": all_chunks[0] if all_chunks else ""
    }


@app.post("/search")
async def search(request: SearchRequest):

    # Generate embedding for the user's question
    query_embedding = generate_embeddings([request.query])[0]

    # Retrieve relevant chunks
    results = search_similar_chunks(query_embedding)

    # Combine retrieved chunks into one context
    context = "\n\n".join([item["text"] for item in results])

    # Ask the LLM
    answer = generate_answer(request.query, context)

    return {
        "query": request.query,
        "answer": answer,
        "sources": results
    }