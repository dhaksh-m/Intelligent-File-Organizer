export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>📂 Organizer</h2>

      <p onClick={() => setPage("dashboard")}>🏠 Dashboard</p>
      <p onClick={() => setPage("search")}>🔍 Search</p>
      <p onClick={() => setPage("stats")}>📊 Stats</p>
      <p onClick={() => setPage("cleanup")}>🧹 Cleanup</p>
    </div>
  );
}