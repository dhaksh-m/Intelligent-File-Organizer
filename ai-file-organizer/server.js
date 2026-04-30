import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());

// 🚀 RUN C PROGRAM
app.get("/run", (req, res) => {
  const folderPath = req.query.path;

  if (!folderPath) {
    return res.status(400).json({ error: "Path is required" });
  }

  const command = `
    cd backend &&
    gcc main.c -o main &&
    main.exe "${folderPath}"
  `;

  exec(command, (error, stdout, stderr) => {
    console.log("----- C OUTPUT -----");
    console.log(stdout);
    console.log("----- C ERROR -----");
    console.log(stderr);

    if (error) {
      return res.status(500).json({
        error: "C execution failed",
        details: stderr
      });
    }

    try {
      // 🔥 Expect JSON from C program
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (e) {
      res.status(500).json({
        error: "Invalid JSON from C program",
        raw: stdout
      });
    }
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});