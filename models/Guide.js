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
  getByPartnerId: (partner_id, callback) => {
    const queryString = 'SELECT * FROM guides WHERE partner_id = ?';
    connection.query(queryString, [partner_id], callback);
  },
  create: (guide, callback) => {
    const { title, content, author, publicationDate, partner_id } = guide;
    const queryString = 'INSERT INTO guides (title, content, author, publicationDate, partner_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(queryString, [title, content, author, publicationDate, partner_id], callback);
  },
  update: (id, guide, callback) => {
    const { title, content, author, publicationDate, partner_id } = guide;
    const queryString = 'UPDATE guides SET title = ?, content = ?, author = ?, publicationDate = ?, partner_id = ? WHERE id = ?';
    connection.query(queryString, [title, content, author, publicationDate, partner_id, id], callback);
  },
  delete: (id, callback) => {
    const queryString = 'DELETE FROM guides WHERE id = ?';
    connection.query(queryString, [id], callback);
  }
};

module.exports = Guide;
