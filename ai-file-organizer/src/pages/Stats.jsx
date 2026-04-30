export default function Stats({ data }) {
  const { files, extensions } = data;

  return (
    <div>
      <h2>📊 Detailed Stats</h2>

      <p>Total Files: {files.length}</p>

      <h3>File Type Distribution</h3>

      {Object.keys(extensions).length === 0 ? (
        <p>No data</p>
      ) : (
        Object.entries(extensions).map(([ext, count]) => (
          <p key={ext}>
            {ext}: {count}
          </p>
        ))
      )}
    </div>
  );
}