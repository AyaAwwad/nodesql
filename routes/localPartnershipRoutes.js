const express = require('express');
const router = express.Router();
const localPartnershipController = require('../controllers/localPartnershipController');

/**
 * @desc  Get all local partners
 * @route  /api/local-partners
 * @method  GET 
 * @access  public
 */
router.get('/', localPartnershipController.getLocalPartners);

/**
 * @desc  Get local partner by id
 * @route  /api/local-partners/:id
 * @method  GET 
 * @access  public
 */
router.get('/:id', localPartnershipController.getLocalPartnerById);

/**
 * @desc  Create new local partner
 * @route  /api/local-partners
 * @method  POST  
 * @access  public
 */
router.post('/', localPartnershipController.createLocalPartner);

/**
 * @desc  Update local partner by id
 * @route  /api/local-partners/:id
 * @method  PUT
 * @access  public
 */
router.put('/:id', localPartnershipController.updateLocalPartner);

/**
 * @desc  Delete local partner by id
 * @route  /api/local-partners/:id
 * @method  DELETE
 * @access  public
 */
router.delete('/:id', localPartnershipController.deleteLocalPartner);

module.exports = router;
