from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# In-memory Qdrant database
client = QdrantClient(path="./qdrant_db")

COLLECTION_NAME = "documents"


def create_collection():
    collections = client.get_collections().collections

    if COLLECTION_NAME not in [c.name for c in collections]:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE,
            ),
        )
        print("Collection created!")
    else:
        print("Collection already exists.")

def store_embeddings(chunks, embeddings, filename, metadata):
    points = []

    for i, (chunk, embedding, meta) in enumerate(
    zip(chunks, embeddings, metadata)
):
        points.append(
            PointStruct(
                id=i,
                vector=embedding.tolist(),
                 payload={
                    "text": chunk,
                    "filename": filename,
                    "page": meta["page"],
                    "chunk_id": i
                }
            )
        )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    print(f"Stored {len(points)} chunks in Qdrant.")

def search_similar_chunks(query_embedding, limit=5):
    response = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_embedding.tolist(),
        limit=limit,
    )

    return [
        {
            "score": point.score,
            "text": point.payload["text"],
            "filename": point.payload["filename"],
            "page": point.payload["page"],
            "chunk_id": point.payload["chunk_id"],
        }
        for point in response.points
    ] 