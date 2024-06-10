const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');



/**
 * @desc  Get All weather
 * @route  /api/weather
 * @method  GET 
 * @access  public
 */
router.get('/', weatherController.getAllWeatherData);

/**
 * @desc  Get weather by id
 * @route  /api/weather/:id
 * @method  GET 
 * @access  public
 */
router.get('/:id', weatherController.getWeatherDataById);

/**
 * @desc  Get weather by garden_id
 * @route  /api/weather/gardens/:garden_id
 * @method  GET 
 * @access  public
 */
router.get("/gardens/:garden_id", weatherController.getWeatherByGardenID);

/**
 * @desc  Create New weather
 * @route  /api/weather
 * @method  POST  
 * @access  public
 */
router.post('/', weatherController.createWeatherData);

/**
 * @desc  Update weather
 * @route  /api/weather/:id
 * @method  PUT  
 * @access  public
 */
router.put('/:id', weatherController.updateWeatherData);

/**
 * @desc  Delete weather
 * @route  /api/weather/:id
 * @method  DELETE  
 * @access  public
 */
router.delete('/:id', weatherController.deleteWeatherData);

module.exports = router;
