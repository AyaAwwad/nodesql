const db = require('../database');

class SoilPestManagement {
    static getAll(callback) {
        db.query('SELECT * FROM soil_pest', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM soil_pest WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    static create(data, callback) {
        const { soil_type, pest_name, pest_control_method, additional_notes } = data;
        db.query('INSERT INTO soil_pest (soil_type, pest_name, pest_control_method, additional_notes) VALUES (?, ?, ?, ?)',
            [soil_type, pest_name, pest_control_method, additional_notes],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: result.insertId, ...data });
                }
            }
        );
    }

    static update(id, data, callback) {
        const { soil_type, pest_name, pest_control_method, additional_notes } = data;
        db.query('UPDATE soil_pest SET soil_type = ?, pest_name = ?, pest_control_method = ?, additional_notes = ? WHERE id = ?',
            [soil_type, pest_name, pest_control_method, additional_notes, id],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            }
        );
    }

    static delete(id, callback) {
        db.query('DELETE FROM soil_pest WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = SoilPestManagement;
