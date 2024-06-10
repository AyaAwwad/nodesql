const db = require('../database');

class WeatherData {
    static getAll(callback) {
        db.query('SELECT * FROM weather', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM weather WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    static getByGID(garden_id , callback) {
        db.query('SELECT * FROM weather WHERE garden_id = ?', [ garden_id ], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static create(data, callback) {
        const { location, temperature, humidity, precipitation, wind_speed, garden_id } = data;
        db.query('INSERT INTO weather (location, temperature, humidity, precipitation, wind_speed, garden_id) VALUES (?, ?, ?, ?, ?, ?)',
            [location, temperature, humidity, precipitation, wind_speed, garden_id],
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
        const { location, temperature, humidity, precipitation, wind_speed, garden_id } = data;
        db.query('UPDATE weather SET location = ?, temperature = ?, humidity = ?, precipitation = ?, wind_speed = ?, garden_id = ? WHERE id = ?',
            [location, temperature, humidity, precipitation, wind_speed, garden_id, id],
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
        db.query('DELETE FROM weather WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = WeatherData;
