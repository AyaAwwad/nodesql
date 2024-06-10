const express = require("express");
const router = express.Router();
const gardenController = require("../controllers/gardenController.js");


/**
 * @desc  Get All gardens
 * @route  /api/gardens
 * @method  GET 
 * @access  public
 */
router.get("/", gardenController.getAllGardens);

/**
 * @desc  Get garden by id
 * @route  /api/gardens/:id
 * @method  GET 
 * @access  public
 */

router.get("/:id", gardenController.getGardenById);
/**
 * @desc  Create New Garden
 * @route  /api/gardens
 * @method  POST  
 * @access  public
 */
router.post("/", gardenController.createGarden);

/**
 * @desc  Update A garden
 * @route  /api/gardens/:id
 * @method  PUT  
 * @access  public
 */
router.put("/:id", gardenController.updateGarden);

/**
 * @desc  Delete A garden
 * @route  /api/gardens/:id
 * @method  DELETE  
 * @access  public
 */ 

router.delete("/:id", gardenController.deleteGarden);

module.exports = router;

