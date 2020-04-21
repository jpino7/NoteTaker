// Modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express Server
const app = express();
// Setting up PORT
const PORT = process.env.PORT || 3000;

// API Routes














// ROUTES
//HTML Routes -- GET Requests
app.get("/notes", req, res => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", req, res => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// JSON Route -- GET Request
app.get("/api/notes", req, res => {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

// PORT Listener
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});