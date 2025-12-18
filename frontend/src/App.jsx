import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import FileListPage from "./pages/FileListPage";
import FileDetailsPage from "./pages/FileDetailsPage";
import "./styles/layout.css";

export default function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        FileInsight Engine
      </header>

      {/* HOME / DASHBOARD */}
      <Routes>
        <Route
          path="/"
          element={
            <main className="dashboard">
              <section className="left-panel">
                <UploadPage />
              </section>

              <section className="right-panel">
                <FileListPage />
              </section>
            </main>
          }
        />

        {/* FILE DETAILS — FULL WIDTH */}
        <Route
          path="/files/:fileId"
          element={
            <main className="details-container">
              <FileDetailsPage />
            </main>
          }
        />
      </Routes>
    </div>
  );
}
