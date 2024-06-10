const express = require("express");
const router = express.Router();
const VolunteerController = require("../controllers/VolunteerController");


/**
 * @desc  Get All volunteers
 * @route  /api/volunteers
 * @method  GET 
 * @access  public
 */
router.get("/", VolunteerController.getAllVolunteers);

/**
 * @desc  Get Volunteer by ID
 * @route  /api/volunteers/:ID
 * @method  GET 
 * @access  public
 */

router.get("/:ID", VolunteerController.getVolunteerByID);

/**
 * @desc  Get Volunteers by garden_id
 * @route  /api/volunteers/gardens/:garden_id
 * @method  GET 
 * @access  public
 */
router.get("/gardens/:garden_id", VolunteerController.getVolunteerByGardenID);

/**
 * @desc  Create New Volunteer
 * @route  /api/volunteers
 * @method  POST  
 * @access  public
 */
router.post("/", VolunteerController.createVolunteer);



/**
 * @desc  Update A Volunteer
 * @route  /api/volunteers/:ID
 * @method  PUT  
 * @access  public
 */
router.put("/:ID", VolunteerController.updateVolunteer);


/**
 * @desc  Delete A Volunteer
 * @route  /api/volunteers/:ID
 * @method  DELETE  
 * @access  public
 */ 

router.delete("/:ID", VolunteerController.deleteVolunteer);

module.exports = router;
