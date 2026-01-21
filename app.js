const express = require("express");
const app = express();
const port = 3000;
const db = require('./db');

// Middleware per leggere JSON nel body (utile per POST/PUT/PATCH)
app.use(express.json());

// Import del router dei post
const postsRouter = require("./routers/posts");

// Rotta base
app.get("/", (req, res) => {
  res.send("Server del blog Routing");
});

// Registrazione router con prefisso /posts
app.use("/posts", postsRouter);

// Middleware 404 - rotta non trovata
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint non trovato"
  });
});

// Middleware di gestione errori
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
  error: err.message || "Errore interno del server"
});
});

// Avvio server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});