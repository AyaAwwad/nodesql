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

    static create(data, callback) {
        const { location, temperature, humidity, precipitation, wind_speed } = data;
        db.query('INSERT INTO weather (location, temperature, humidity, precipitation, wind_speed) VALUES (?, ?, ?, ?, ?)',
            [location, temperature, humidity, precipitation, wind_speed],
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
        const { location, temperature, humidity, precipitation, wind_speed } = data;
        db.query('UPDATE weather SET location = ?, temperature = ?, humidity = ?, precipitation = ?, wind_speed = ? WHERE id = ?',
            [location, temperature, humidity, precipitation, wind_speed, id],
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
