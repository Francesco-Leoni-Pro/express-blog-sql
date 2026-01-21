const mysql = require('mysql2');

// Configurazione della connessione
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MysqlPro',
  database: 'blog'
});

// Test della connessione
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione:', err);
  } else {
    console.log('Connesso al database MySQL!');
  }
});

module.exports = connection;