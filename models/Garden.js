const db = require('../database');

class Garden {
    // Get all gardens
    static getAll(callback) {
        db.query('SELECT * FROM gardens', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Get a single garden by ID
    static getById(id, callback) {
        db.query('SELECT * FROM gardens WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    // Create a new garden
    static create(data, callback) {
        const { name, location, plotsAvailable, conditions } = data;
        db.query('INSERT INTO gardens (name, location, plotsAvailable, conditions) VALUES (?, ?, ?, ?)',
            [name, location, plotsAvailable, conditions],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: result.insertId, ...data });
                }
            }
        );
    }

    // Update an existing garden
    static update(id, data, callback) {
        const { name, location, plotsAvailable, conditions } = data;
        db.query(
            'UPDATE gardens SET name = ?, location = ?, plotsAvailable = ?, conditions = ? WHERE id = ?',
            [name, location, plotsAvailable, conditions, id],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id, ...data });
                }
            }
        );
    }

    // Delete a garden
    static delete(id, callback) {
        db.query('DELETE FROM gardens WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: "Garden deleted", id });
            }
        });
    }
}

module.exports = Garden;
