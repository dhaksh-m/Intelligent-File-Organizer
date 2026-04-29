import { useState } from "react";
import FileList from "../components/FileList";

export default function Dashboard({ files, loadFiles }) {
  const [path, setPath] = useState("");

  // categorize files
  const images = files.filter(f => f.match(/\.(jpg|png)$/i));
  const videos = files.filter(f => f.match(/\.(mp4|mkv)$/i));
  const docs = files.filter(f => f.match(/\.(pdf|txt|docx)$/i));

  return (
    <>
      <h1>📂 Dashboard</h1>

      <input
        placeholder="Enter folder path..."
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />

      <button onClick={() => loadFiles(path)}>
        Scan Folder
      </button>

      {/* 📊 Stats */}
      <div className="card">
        <h3>📊 Stats</h3>
        <p>Total Files: {files.length}</p>
        <p>Images: {images.length}</p>
        <p>Videos: {videos.length}</p>
        <p>Docs: {docs.length}</p>
      </div>

      {/* 📂 Categories */}
      <div className="card">
        <h3>🖼 Images</h3>
        {images.map((f, i) => <p key={i}>{f}</p>)}
      </div>

      <div className="card">
        <h3>🎥 Videos</h3>
        {videos.map((f, i) => <p key={i}>{f}</p>)}
      </div>

      <div className="card">
        <h3>📄 Documents</h3>
        {docs.map((f, i) => <p key={i}>{f}</p>)}
      </div>

      {/* All files */}
      <FileList files={files} />
    </>
  );
}