class MemoryStore:
    def __init__(self):
        self.db = {}

    def save(self, fileId, data):
        self.db[fileId] = data

    def get(self, fileId):
        return self.db.get(fileId)

    def delete(self, fileId):
        if fileId in self.db:
            del self.db[fileId]

    def list_files(self):
        return [
            {"fileId": f, "userId": v["userId"], "useCase": v["useCase"]}
            for f, v in self.db.items()
        ]
