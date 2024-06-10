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

    static getByGId(garden_id, callback) {
        db.query('SELECT * FROM resource WHERE garden_id = ?', [garden_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    static getByVId(volunteer_id, callback) {
        db.query('SELECT * FROM resource WHERE volunteer_id = ?', [volunteer_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }


    // Create a new Resource
    static create(data, callback) {
        const { name, category, description, quantity, owner, garden_id, volunteer_id} = data;
        db.query('INSERT INTO resource (name, category, description, quantity, owner, garden_id, volunteer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, category, description,quantity, owner, garden_id, volunteer_id],
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
        const { name, category, description, quantity,  owner, garden_id, volunteer_id } = data;
        db.query('UPDATE resource SET name = ?, category = ?, description = ?, quantity= ?, owner = ?, garden_id = ?, volunteer_id = ? WHERE id = ?',
            [name, category, description, quantity, owner, garden_id, volunteer_id,  id],
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
