const db = require('../database');

class Volunteer {
    // Get all volunteers
    static getAll(callback) {
        db.query('SELECT * FROM volunteers', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Get a single volunteer by ID
    static getByID(ID, callback) {
        db.query('SELECT * FROM volunteers WHERE ID = ?', [ID], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

        // Get a volunteer by Garden id
        static getByGID(garden_id , callback) {
            db.query('SELECT * FROM volunteers WHERE garden_id = ?', [ garden_id ], (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            });
        }

    // Create a new volunteer
    static create(data, callback) {
        const { Name, PhoneNumber, VolunteerDate, garden_id} = data;
        db.query('INSERT INTO volunteers ( Name, PhoneNumber, VolunteerDate, garden_id) VALUES ( ?, ?, ?, ?)',
            [ Name, PhoneNumber, VolunteerDate, garden_id],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { ID: result.insertID, ...data });
                }
            }
        );
    }

    // Update an existing Volunteer
    static update(ID, data, callback) {
        const { Name, PhoneNumber, VolunteerDate, garden_id } = data;
        db.query(
            'UPDATE volunteers SET Name = ?, PhoneNumber = ?, VolunteerDate = ?, garden_id = ? WHERE ID = ?',
            [Name, PhoneNumber, VolunteerDate, garden_id, ID],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { ID, ...data });
                }
            }
        );
    }

    // Delete a Volunteer
    static delete(ID, callback) {
        db.query('DELETE FROM volunteers WHERE ID = ?', [ID], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: "Volunteer deleted", ID });
            }
        });
    }
}

module.exports = Volunteer;
