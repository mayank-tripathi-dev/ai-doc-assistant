from langchain.tools import tool

from services.embedding_service import generate_embeddings
from database.qdrant import search_similar_chunks
from database.qdrant import get_documents


@tool
def retrieve_documents(query: str) -> str:
    """
    Search the uploaded PDF documents using semantic vector search.

    Use this tool whenever a user asks a question about uploaded
    documents.

    Input:
        Natural language question.

    Returns:
        Relevant document chunks.
    """

    embedding = generate_embeddings([query])[0]

    results = search_similar_chunks(embedding)

    if not results:
        return "No relevant documents found."

    context = ""

    for item in results:
        context += (
            f"Filename: {item['filename']}\n"
            f"Page: {item['page']}\n"
            f"Content: {item['text']}\n\n"
        )

    return context

@tool
def list_documents() -> str:
    """
    List all uploaded documents.
    """

    docs = get_documents()

    if not docs:
        return "No uploaded documents."

    return "\n".join(docs)