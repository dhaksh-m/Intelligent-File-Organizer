export default function Stats({ files }) {
  return (
    <>
      <h1>📊 Stats</h1>

      <div className="card">
        Total Files: {files.length}
      </div>
    </>
  );
}