import { useState } from "react";

export default function SearchBar({ files }) {
  const [query, setQuery] = useState("");

  const filtered = files.filter(f =>
    f.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="card">
      <h3>🔍 Search Files</h3>

      <input
        placeholder="Search files..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((f, i) => (
        <p key={i}>{f}</p>
      ))}
    </div>
  );
}