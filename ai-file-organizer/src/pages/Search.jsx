import { useState } from "react";

export default function Search({ files }) {
  const [query, setQuery] = useState("");

  const filtered = files.filter(f =>
    f.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>🔍 Search Files</h2>

      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ marginTop: "15px" }}>
        {filtered.length === 0 ? (
          <p>No results</p>
        ) : (
          filtered.map((file, i) => <p key={i}>{file}</p>)
        )}
      </div>
    </div>
  );
}