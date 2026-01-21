const posts = require("../posts");
const db = require('../db');

// Index → restituisce la lista dei post in JSON
function index(req, res) {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nella query' });
    }
    res.json(results);
  });
}

// Show → restituisce un singolo post in JSON
function show(req, res, next) {
  const id = parseInt(req.params.id);

  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    res.json(results[0]);
  });
}

// Create → stampa i dati ricevuti e risponde con messaggio
function store(req, res) {
  const newPost = req.body;

  // Aggiunge il post all'array
  posts.push(newPost);

  console.log(posts); // lista aggiornata nel terminale

  // Risposta: conferma + JSON del nuovo post
  res.status(201).json({
    message: "Post creato con successo",
    post: newPost
  });
}

// Update (PUT) (ancora solo messaggio)
function update(req, res) {
  const id = parseInt(req.params.id);
  const updatedPost = req.body;

  // Controllo se l'id esiste
  if (id < 0 || id >= posts.length) {
    return res.status(404).json({ message: "Post non trovato" });
  }

  // Aggiorna completamente il post
  posts[id] = updatedPost;

  console.log(posts); // lista aggiornata nel terminale

  res.json({
    message: `Post ${id} aggiornato con successo`,
    post: updatedPost
  });
}

// Modify (PATCH) (ancora solo messaggio)
function modify(req, res) {
  const { id } = req.params;
  res.send(`Modifica parziale del post ${id}`);
}

// Delete → elimina il post, stampa lista aggiornata, status 204
function destroy(req, res) {
  const id = parseInt(req.params.id);

  db.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore nella query' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    // 204 = No Content
    res.sendStatus(204);
  });
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
};