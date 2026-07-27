from fastapi import FastAPI, UploadFile, File
from services.pdf_service import extract_text
from utils.chunker import chunk_text
import shutil
import os

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "AI Document Assistant API 🚀"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)

    chunks = chunk_text(text)

    return {
    "filename": file.filename,
    "characters": len(text),
    "chunks": len(chunks),
    "first_chunk": chunks[0]
}