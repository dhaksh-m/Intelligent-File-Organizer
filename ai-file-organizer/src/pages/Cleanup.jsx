export default function Cleanup({ duplicates }) {
  return (
    <div>
      <h2>🧹 Duplicate Files</h2>

      {duplicates.length === 0 ? (
        <p>✅ No duplicates found</p>
      ) : (
        duplicates.map((file, i) => (
          <p key={i}>⚠️ {file}</p>
        ))
      )}
    </div>
  );
}