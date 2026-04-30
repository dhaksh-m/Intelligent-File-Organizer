import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Stats from "./pages/Stats";
import Cleanup from "./pages/Cleanup";

import "./global.css";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const [data, setData] = useState({
    files: [],
    extensions: {},
    duplicates: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [folderPath, setFolderPath] = useState("");

  // 🔥 API CALL
  const loadFiles = async (path) => {
    if (!path) {
      setError("Please enter a folder path");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5000/run?path=${encodeURIComponent(path)}`
      );

      if (!res.ok) throw new Error("Backend error");

      const result = await res.json();

      setData(result);

    } catch (err) {
      console.error(err);
      setError("⚠️ Backend not reachable");

      // fallback demo data
      setData({
        files: ["demo.jpg", "sample.pdf", "video.mp4"],
        extensions: { ".jpg": 1, ".pdf": 1, ".mp4": 1 },
        duplicates: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar setPage={setPage} />

      <div className="main">
        {/* 🔥 Error UI */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* 🔄 Loading */}
        {loading && <p>🔄 Scanning files...</p>}

        {/* Pages */}
        {page === "dashboard" && (
          <Dashboard
            data={data}
            folderPath={folderPath}
            setFolderPath={setFolderPath}
            loadFiles={loadFiles}
          />
        )}

        {page === "search" && <Search files={data.files} />}
        {page === "stats" && <Stats data={data} />}
        {page === "cleanup" && <Cleanup duplicates={data.duplicates} />}
      </div>
    </div>
  );
}