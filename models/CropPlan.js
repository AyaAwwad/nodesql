const db = require('../database');

class CropPlan {
    static getAll(callback) {
        db.query('SELECT * FROM crop_plans', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM crop_plans WHERE id = ?', [id], callback);
    }
 static create(data, callback) {
        const { cropType, plantingDate, harvestDate, notes } = data;
        db.query('INSERT INTO crop_plans (cropType, plantingDate, harvestDate, notes) VALUES (?, ?, ?, ?)',
            [cropType, plantingDate, harvestDate, notes],
            (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: result.insertId, ...data });
                }
            }
        );
    }
 
    /*static create(data, callback) {
        db.query('INSERT INTO crop_plans (cropType, plantingDate, harvestDate, notes) VALUES (?, ?, ?, ?)', 
            [data.cropType, data.plantingDate, data.harvestDate, data.notes], callback);
    }*/

    static update(id, data, callback) {
        db.query('UPDATE crop_plans SET cropType = ?, plantingDate = ?, harvestDate = ?, notes = ? WHERE id = ?', 
            [data.cropType, data.plantingDate, data.harvestDate, data.notes, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM crop_plans WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: "CropPlan deleted", id });
            }
        });
    }
   /* static delete(id, callback) {
        db.query('DELETE FROM crop_plans WHERE id = ?', [id], callback);
    }*/
}

module.exports = CropPlan;
