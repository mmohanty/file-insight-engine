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

      <main className="dashboard">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="left-panel">
                  <UploadPage />
                </section>
                <section className="right-panel">
                  <FileListPage />
                </section>
              </>
            }
          />

          <Route
            path="/files/:fileId"
            element={
              <section className="right-panel">
                <FileDetailsPage />
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
