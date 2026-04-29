export default function FileList({ files }) {
  return (
    <div className="card">
      <h3>📁 Files</h3>

      {files.length === 0 ? (
        <p>No files loaded</p>
      ) : (
        files.map((file, i) => <p key={i}>{file}</p>)
      )}
    </div>
  );
}