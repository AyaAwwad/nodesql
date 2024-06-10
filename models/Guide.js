const connection = require('../database');

const Guide = {
  getAll: (callback) => {
    const queryString = 'SELECT * FROM guides';
    connection.query(queryString, callback);
  },
  getById: (id, callback) => {
    const queryString = 'SELECT * FROM guides WHERE id = ?';
    connection.query(queryString, [id], callback);
  },
  create: (guide, callback) => {
    const { title, content, author, publicationDate } = guide;
    const queryString = 'INSERT INTO guides (title, content, author, publicationDate) VALUES (?, ?, ?, ?)';
    connection.query(queryString, [title, content, author, publicationDate], callback);
  },
  update: (id, guide, callback) => {
    const { title, content, author, publicationDate } = guide;
    const queryString = 'UPDATE guides SET title = ?, content = ?, author = ?, publicationDate = ? WHERE id = ?';
    connection.query(queryString, [title, content, author, publicationDate, id], callback);
  },
  delete: (id, callback) => {
    const queryString = 'DELETE FROM guides WHERE id = ?';
    connection.query(queryString, [id], callback);
  }
};

module.exports = Guide;
