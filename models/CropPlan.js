const db = require('../database');

class CropPlan {
    static getAll(callback) {
        db.query('SELECT * FROM crop_plans', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM crop_plans WHERE id = ?', [id], callback);
    }

    static getByGId(garden_id, callback) {
        db.query('SELECT * FROM crop_plans WHERE garden_id = ?', [garden_id], callback);
    }
    static getByPId(partner_id, callback) {
        db.query('SELECT * FROM crop_plans WHERE partner_id = ?', [partner_id], callback);
    }
 static create(data, callback) {
        const { cropType, plantingDate, harvestDate, notes, garden_id, partner_id } = data;
        db.query('INSERT INTO crop_plans (cropType, plantingDate, harvestDate, notes, garden_id, partner_id) VALUES (?, ?, ?, ?, ?, ?)',
            [cropType, plantingDate, harvestDate, notes, garden_id, partner_id],
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
        db.query('UPDATE crop_plans SET cropType = ?, plantingDate = ?, harvestDate = ?, notes = ?, garden_id = ?, partner_id = ? WHERE id = ?', 
            [data.cropType, data.plantingDate, data.harvestDate, data.notes, garden_id, partner_id, id], callback);
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
