const db = require('../database');

class LocalPartner {
    // Get all local partners
    static getAll(callback) {
        db.query('SELECT * FROM local_partners', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Get a single local partner by ID
    static getById(id, callback) {
        db.query('SELECT * FROM local_partners WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    // Create a new local partner
    static create(data, callback) {
        const { name, description, type, location, contact_info, date_added, offerings } = data;
        db.query('INSERT INTO local_partners (name, description, type, location, contact_info, date_added, offerings) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, type, location, contact_info, date_added, offerings],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: result.insertId, ...data });
                }
            }
        );
    }

    // Update a local partner
    static update(id, data, callback) {
        const { name, description, type, location, contact_info, date_added, offerings } = data;
        db.query('UPDATE local_partners SET name = ?, description = ?, type = ?, location = ?, contact_info = ?, date_added = ?, offerings = ? WHERE id = ?',
            [name, description, type, location, contact_info, date_added, offerings, id],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id, ...data });
                }
            }
        );
    }

    // Delete a local partner
    static delete(id, callback) {
        db.query('DELETE FROM local_partners WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = LocalPartner;
