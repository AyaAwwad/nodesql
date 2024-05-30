const express = require('express');
const router = express.Router();
const cropPlanController = require('../controllers/cropPlanController');


/**
 * @desc  Get All CropPlans
 * @route  /api/crop-plans
 * @method  GET 
 * @access  public
 */
router.get('/', cropPlanController.getAllCropPlans);
/**
 * @desc  Get CropPlan By Id
 * @route  /api/crop-plans/:id
 * @method  GET 
 * @access  public
 */
router.get('/:id', cropPlanController.getCropPlanById);
/**
 * @desc  Create CropPlan
 * @route  /api/crop-plans
 * @method  POST  
 * @access  public
 */
router.post('/', cropPlanController.createCropPlan);
/**
 * @desc  Update A CropPlan
 * @route  /api/crop-plans/:id
 * @method  PUT  
 * @access  public
 */
router.put('/:id', cropPlanController.updateCropPlan);
/**
 * @desc  Delete A CropPlan
 * @route  /api/crop-plans/:id
 * @method  DELETE  
 * @access  public
 */ 
router.delete('/:id', cropPlanController.deleteCropPlan);

module.exports = router;
