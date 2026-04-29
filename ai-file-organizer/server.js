import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(cors());

// API to run C program
app.get("/run", (req, res) => {
  const folderPath = req.query.path; // ✅ get path from URL

  if (!folderPath) {
    return res.status(400).send("Path required");
  }

  const command = `cd backend && gcc main.c -o main && .\\main.exe "${folderPath}"`;

  exec(command, (error, stdout, stderr) => {
    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);

    if (error) {
      console.error(error);
      return res.status(500).send("Error running C program");
    }

    // ✅ read output file
    fs.readFile("public/backend/output.txt", "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading output");
      }

      res.json({
        files: data.split("\n").filter(f => f.trim() !== "")
      });
    });
  });
});

// optional root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});