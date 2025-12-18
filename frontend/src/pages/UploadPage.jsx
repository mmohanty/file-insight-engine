import { useState } from "react";
import { uploadFile } from "../api";
import "@/styles/layout.css";

export default function UploadPage({ useCase }) {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");

  const submit = async () => {
    await uploadFile(file, userId, useCase);
    alert("Upload successful");
  };

  return (
    <div className="card">
      <div className="header">Upload JSONL File</div>

      <div className="grid">
        <input
          placeholder="User ID (required)"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <label className="file-upload">
          <input
            type="file"
            accept=".jsonl"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
          <span>{file ? file.name : "Select JSONL file"}</span>
        </label>
      </div>

      <br />
      <button className="primary" disabled={!file || !userId} onClick={submit}>
        Upload
      </button>
    </div>
  );
}
