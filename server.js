// Modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express Server
const app = express();
// Setting up PORT
const PORT = process.env.PORT || 3000;

//Body parsing, static, and routing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// Empty array for Notes Data
let notesData = [];

// API Routes
// API GET
app.get("/api/notes", function (err, res) {
    try {
        notesData = fs.readFileSync("./db/db.json", "utf8");
        console.log("Success JSON file was read!");
        notesData = JSON.parse(notesData);

        // Error Handling
    } catch (err) {
        console.log("Error in app.get:");
        console.log(err);
    }
    // Send to browser
    res.json(notesData);
});

// API POST
app.post("/api/notes", function (req, res) {
    try {
        notesData = fs.readFileSync("./db/db.json", "utf8");
        console.log(notesData);
        notesData = JSON.parse(notesData);

        // Setting New Notes ID
        req.body.id = notesData.length;
        notesData.push(req.body);
        notesData = JSON.stringify(notesData);
        // Write New Note to File
        fs.writeFile("./db/db.json", notesData, "utf8", err => {
            if (err)
                throw err;
        });

        res.json(JSON.parse(notesData));
        // Error Handling
    } catch (err) {
        throw err;
    }
});

// API DELETE












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