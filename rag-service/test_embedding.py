from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

text = "Artificial Intelligence"

embedding = model.encode(text)

print(type(embedding))
print(len(embedding))
print(embedding[:10])