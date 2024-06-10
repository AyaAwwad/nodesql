const express = require('express');
const router = express.Router();
const soilPestController = require('../controllers/soilPestController');



/**
 * @desc  Get All soil_pest
 * @route  /api/soil_pest
 * @method  GET 
 * @access  public
 */
router.get('/', soilPestController.getAllSoilPestData);

/**
 * @desc  Get soil_pest by id
 * @route  /api/soil_pest/:id
 * @method  GET 
 * @access  public
 */
router.get('/:id', soilPestController.getSoilPestDataById);

/**
 * @desc  Create New soil_pest
 * @route  /api/soil_pest
 * @method  POST  
 * @access  public
 */
router.post('/', soilPestController.createSoilPestData);

/**
 * @desc  Update soil_pest
 * @route  /api/soil_pest/:id
 * @method  PUT  
 * @access  public
 */
router.put('/:id', soilPestController.updateSoilPestData);

/**
 * @desc  Delete soil_pest
 * @route  /api/soil_pest/:id
 * @method  DELETE  
 * @access  public
 */
router.delete('/:id', soilPestController.deleteSoilPestData);

module.exports = router;
