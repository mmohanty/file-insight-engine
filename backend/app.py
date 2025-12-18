from fastapi import FastAPI, UploadFile, Form, HTTPException
from pydantic import BaseModel
from uuid import uuid4
import json
from storage.memory_store import MemoryStore
from services.embedding_service import generate_embedding, generate_summary
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
store = MemoryStore()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# API MODELS
# ------------------------

class FileInfo(BaseModel):
    fileId: str
    userId: str
    useCase: str
    items: list


# ------------------------
# ROUTES
# ------------------------

@app.post("/upload")
async def upload_jsonl(
    file: UploadFile,
    userId: str = Form(...),
    useCase: str = Form(...)
):
    if not file.filename.endswith(".jsonl"):
        raise HTTPException(status_code=400, detail="Only .jsonl allowed")

    fileId = str(uuid4())
    processed_items = []

    # Read JSONL line by line
    for line in (await file.read()).decode("utf-8").splitlines():
        row = json.loads(line)

        embedding = generate_embedding(row)
        summary = generate_summary(row)

        processed_items.append({
            "original": row,
            "embedding": embedding,
            "generated": summary
        })

    # Save to in-memory DB
    store.save(fileId, {
        "fileId": fileId,
        "userId": userId,
        "useCase": useCase,
        "items": processed_items
    })

    return {"fileId": fileId}


@app.get("/files")
def list_files():
    return store.list_files()


@app.get("/files/{fileId}")
def get_file(fileId: str):
    result = store.get(fileId)
    if not result:
        raise HTTPException(status_code=404, detail="File not found")
    return result


@app.delete("/files/{fileId}")
def remove(fileId: str):
    store.delete(fileId)
    return {"status": "deleted"}
