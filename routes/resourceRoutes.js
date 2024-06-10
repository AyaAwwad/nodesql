const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

/**
 * @desc  Get All resources
 * @route  /api/resources
 * @method  GET 
 * @access  public
 */
router.get('/', resourceController.getResources);

/**
 * @desc  Get resource by id
 * @route  /api/resources/:id
 * @method  GET 
 * @access  public
 */
router.get('/:id', resourceController.getResourceById);

/**
 * @desc  Create New Resource
 * @route  /api/resources
 * @method  POST  
 * @access  public
 */
router.post('/', resourceController.createResource);

/**
 * @desc  Update Resource
 * @route  /api/resources/:id
 * @method  PUT  
 * @access  public
 */
router.put('/:id', resourceController.updateResource);

/**
 * @desc  Delete Resource
 * @route  /api/resources/:id
 * @method  DELETE  
 * @access  public
 */
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
