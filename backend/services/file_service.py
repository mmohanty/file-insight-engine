import json
from backend.services.embedding_service import generate_embedding, generate_summary


def process_jsonl_file(file_bytes: bytes):
    """
    Reads a JSONL file and returns processed records
    """
    items = []

    lines = file_bytes.decode("utf-8").splitlines()

    for line in lines:
        if not line.strip():
            continue

        record = json.loads(line)

        embedding = generate_embedding(record)
        generated = generate_summary(record)

        items.append({
            "original": record,
            "embedding": embedding,
            "generated": generated
        })

    return items
