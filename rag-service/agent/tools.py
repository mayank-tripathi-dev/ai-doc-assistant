from langchain.tools import tool

from services.embedding_service import generate_embeddings
from database.qdrant import search_similar_chunks
from database.qdrant import get_documents
from database.qdrant import delete_document
import os
from tavily import TavilyClient

tavily = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


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


@tool
def summarize_document(filename: str) -> str:
    """
    Summarize an uploaded document.

    Input:
        Exact filename of the uploaded document.
    """

    embedding = generate_embeddings(
        ["Summarize this document"]
    )[0]

    results = search_similar_chunks(
        embedding,
        filename=filename,
        limit=20,
    )

    if not results:
        return "Document not found."

    context = "\n\n".join(
        item["text"] for item in results
    )

    return context


@tool
def remove_document(filename: str) -> str:
    """
    Delete an uploaded document.

    Input:
        Exact filename.
    """

    delete_document(filename)

    return f"{filename} deleted successfully."


@tool
def web_search(query: str) -> str:
    """
    Search the internet for current information.

    Use this tool whenever the answer cannot
    be found in uploaded documents or the user
    asks about recent events or general knowledge.
    """

    response = tavily.search(
        query=query,
        max_results=5,
    )

    results = response["results"]

    context = ""

    for result in results:
        context += (
            f"Title: {result['title']}\n"
            f"Content: {result['content']}\n\n"
        )

    return context