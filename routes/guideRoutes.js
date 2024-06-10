const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

/**
 * @desc  get All Guides
 * @route  /api/guides
 * @method  GET 
 * @access  public
 */router.get('/', guideController.getAllGuides);

/**
 * @desc  Get Guides by id
 * @route   /api/guides/:id
 * @method  GET 
 * @access  public
 * 
 */router.get('/:id', guideController.getGuideById);

 /**
 * @desc  Get Guides by partner_id
 * @route   /api/guides/local_partners/:partner_id
 * @method  GET 
 * @access  public
 * 
 */router.get('/local_partners/:partner_id', guideController.getGuideByPartnerId);

/**
 * @desc  Create New Guides
 * @route  /api/guides
 * @method  POST  
 * @access  public
 */
router.post('/', guideController.createGuide);

/**
 * @desc  Update A Guides
 * @route  /api/guides/:id
 * @method  PUT  
 * @access  public
 */
router.put('/:id', guideController.updateGuide);

/**
 * @desc  Delete A Guides
 * @route  /api/guides/:id
 * @method  DELETE  
 * @access  public
 */ 
router.delete('/:id', guideController.deleteGuide);

module.exports = router;
