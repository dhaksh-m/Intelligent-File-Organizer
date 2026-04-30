import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Stats from "./pages/Stats";
import Cleanup from "./pages/Cleanup";

import "./global.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 REAL-TIME: call backend API
  const loadFiles = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/run");
      const data = await res.json();

      setFiles(data.files || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ AUTO LOAD on start
  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="container">
      <Sidebar setPage={setPage} />

      <div className="main">
        {/* 🔄 Loading State */}
        {loading && <p>🔄 Scanning files...</p>}

        {/* 🧠 Page Routing */}
        {page === "dashboard" && (
          <Dashboard files={files} loadFiles={loadFiles} />
        )}

        {page === "search" && <Search files={files} />}

        {page === "stats" && <Stats files={files} />}

        {page === "cleanup" && <Cleanup files={files} />}
      </div>
    </div>
  );
}