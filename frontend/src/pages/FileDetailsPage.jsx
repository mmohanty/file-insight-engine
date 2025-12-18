import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFile } from "../api";
import "@/styles/layout.css";

export default function FileDetailsPage() {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getFile(fileId).then(res => setData(res.data));
  }, [fileId]);

  if (!data) {
    return <div className="card">Loading...</div>;
  }

  return (
    <>
      <div className="page-header">
        <button className="secondary" onClick={() => navigate("/")}>
          ← Back to Files
        </button>
        <h1>File Details</h1>
      </div>

      <div className="card meta-card">
        <p><b>User:</b> {data.userId}</p>
        <p><b>Use Case:</b> {data.useCase}</p>
        <p><b>File ID:</b> {data.fileId}</p>
      </div>

      {data.items.map((item, idx) => (
        <div key={idx} className="card item-card">
          <h3>Record {idx + 1}</h3>

          <section>
            <h4>Original</h4>
            <pre>{JSON.stringify(item.original, null, 2)}</pre>
          </section>

          <section>
            <h4>Generated Summary</h4>
            <p className="generated">{item.generated}</p>
          </section>

          <details>
            <summary>View Embedding Vector</summary>
            <pre className="embedding">
              {JSON.stringify(item.embedding, null, 2)}
            </pre>
          </details>
        </div>
      ))}
    </>
  );
}
