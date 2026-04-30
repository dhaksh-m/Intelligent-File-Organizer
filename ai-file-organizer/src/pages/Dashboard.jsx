export default function Dashboard({ data, loadFiles, folderPath, setFolderPath }) {
  const { files, extensions } = data;

  const images = files.filter(f => f.match(/\.(jpg|png|jpeg)$/i));
  const videos = files.filter(f => f.match(/\.(mp4|mkv)$/i));
  const docs = files.filter(f => f.match(/\.(pdf|docx|txt)$/i));

  return (
    <div>
      <h2>📁 Dashboard</h2>

      {/* 🔍 Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          placeholder="Enter folder path"
          style={{ padding: "8px", width: "300px" }}
        />

        <button
          onClick={() => loadFiles(folderPath)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          Scan Folder
        </button>
      </div>

      {/* 📊 Stats */}
      <div>
        <h3>📊 Stats</h3>
        <p>Total Files: {files.length}</p>
        <p>Images: {images.length}</p>
        <p>Videos: {videos.length}</p>
        <p>Docs: {docs.length}</p>
      </div>

      {/* 📂 Extension Count */}
      <div style={{ marginTop: "20px" }}>
        <h3>📂 File Types</h3>

        {Object.keys(extensions).length === 0 ? (
          <p>No data</p>
        ) : (
          Object.entries(extensions).map(([ext, count]) => (
            <p key={ext}>
              {ext} → {count}
            </p>
          ))
        )}
      </div>

      {/* 📁 File List */}
      <div style={{ marginTop: "20px" }}>
        <h3>📁 Files</h3>

        {files.length === 0 ? (
          <p>No files found</p>
        ) : (
          files.map((file, i) => <p key={i}>{file}</p>)
        )}
      </div>
    </div>
  );
}