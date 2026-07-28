from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# In-memory Qdrant database
client = QdrantClient(":memory:")

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


def store_embeddings(chunks, embeddings):
    points = []

    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        points.append(
            PointStruct(
                id=i,
                vector=embedding.tolist(),
                payload={
                    "text": chunk
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
        }
        for point in response.points
    ]