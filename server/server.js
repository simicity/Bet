const express = require("express");
const cors = require("cors");
const app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./bet.db');

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res, next) => {
    db.all("SELECT rowid, * FROM posts", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.status(200).json({rows});
    });
});

app.get("/post/:id", (req, res) => {
    db.get(`SELECT rowid, * FROM posts WHERE rowid = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.status(200).json(row);
    });
});

app.post("/post", (req, res, next) => {
    db.run(`INSERT INTO posts (title, author, description) VALUES (?,?,?)`,
        [req.body.title, req.body.author, req.body.description],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201);
        });
});

app.put("/post/:id", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE employees set title = ?, author = ?, description = ? WHERE rowid = ?`,
        [req.body.title, req.body.author, req.body.description, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200);
        });
});

app.delete("/post/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE id = ?`, [req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200);
        });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});