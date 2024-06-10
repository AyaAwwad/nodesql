const db = require('../database');

class Resource {
    // Get all Resources
    static getAll(callback) {
        db.query('SELECT * FROM resource', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Get a single Resource by ID
    static getById(id, callback) {
        db.query('SELECT * FROM resource WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    // Create a new Resource
    static create(data, callback) {
        const { name, category, description, quantity, owner} = data;
        db.query('INSERT INTO resource (name, category, description, quantity, owner) VALUES (?, ?, ?, ?, ?)',
            [name, category, description,quantity, owner],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: result.insertId, ...data });
                }
            }
        );
    }

    // Update a Resource by ID
    static update(id, data, callback) {
        const { name, category, description, quantity,  owner } = data;
        db.query('UPDATE resource SET name = ?, category = ?, description = ?, quantity= ?, owner = ? WHERE id = ?',
            [name, category, description, quantity, owner,  id],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id, ...data });
                }
            }
        );
    }

    // Delete a Resource by ID
    static delete(id, callback) {
        db.query('DELETE FROM resource WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows);
            }
        });
    }
}

module.exports = Resource;
