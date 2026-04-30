export default function Dashboard({ data, loadFiles, folderPath, setFolderPath }) {
  const { files = [], extensions = {} } = data || {};

  const images = files.filter(f => f.match(/\.(jpg|png|jpeg)$/i));
  const videos = files.filter(f => f.match(/\.(mp4|mkv)$/i));
  const docs = files.filter(f => f.match(/\.(pdf|docx|txt)$/i));

  return (
    <div className="dashboard">
      <h1 className="title">📁 Smart File Organizer</h1>

      {/* 🔍 Search Bar */}
      <div className="search-box">
        <input
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          placeholder="Enter folder path..."
        />
        <button onClick={() => loadFiles(folderPath)}>Scan</button>
      </div>

      {/* 📊 Stats Cards */}
      <div className="stats-grid">
        <div className="card gradient-blue">
          <h3>Total Files</h3>
          <p>{files.length}</p>
        </div>

        <div className="card gradient-pink">
          <h3>Images</h3>
          <p>{images.length}</p>
        </div>

        <div className="card gradient-purple">
          <h3>Videos</h3>
          <p>{videos.length}</p>
        </div>

        <div className="card gradient-green">
          <h3>Documents</h3>
          <p>{docs.length}</p>
        </div>
      </div>

      {/* 📂 Extensions */}
      <div className="glass-card">
        <h2>📂 File Types</h2>
        {Object.keys(extensions).length === 0 ? (
          <p>No data</p>
        ) : (
          Object.entries(extensions).map(([ext, count]) => (
            <div key={ext} className="row">
              <span>{ext}</span>
              <span>{count}</span>
            </div>
          ))
        )}
      </div>

      {/* 📄 Files */}
      <div className="glass-card">
        <h2>📄 Files</h2>
        {files.length === 0 ? (
          <p>No files found</p>
        ) : (
          files.map((file, i) => (
            <div key={i} className="file-item">
              {file}
            </div>
          ))
        )}
      </div>
    </div>
  );
}