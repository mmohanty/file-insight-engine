import {useEffect, useState} from "react";
import {getFiles, deleteFile} from "../api";
import Pagination from "../components/Pagination";
import "@/styles/layout.css";
import "@/styles/table.css";
import {useNavigate} from "react-router-dom";

export default function FileListPage({onSelect}) {
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const navigate = useNavigate();


    useEffect(() => {
        getFiles().then(res => setFiles(res.data));
    }, []);

    const start = (page - 1) * pageSize;
    const visible = files.slice(start, start + pageSize);
    const totalPages = Math.max(1, Math.ceil(files.length / pageSize));
    return (
        <div className="card">
            <div className="header">Uploaded Files</div>

            <table>
                <thead>
                <tr>
                    <th>File ID</th>
                    <th>User</th>
                    <th>Use Case</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {visible.map(f => (
                    <tr key={f.fileId}>
                        <td>{f.fileId}</td>
                        <td>{f.userId}</td>
                        <td>{f.useCase}</td>
                        <td>
                            <button
                                className="secondary"
                                onClick={() => navigate(`/files/${f.fileId}`)}
                            >
                                View
                            </button>
                            {" "}
                            <button className="danger" onClick={() => deleteFile(f.fileId)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
        </div>
    );
}
