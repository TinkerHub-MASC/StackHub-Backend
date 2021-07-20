const router = require('express').Router();
const adminController = require('../controller/adminController');
const userControler = require("../controller/userController");


//admin


//@desc for adding new events
//@route Post /admin/events
router.post("/events",adminController.addingNewEvents)

//@desc for geting a event
//@route get:id /admin/events
router.get("/events/:id",adminController.getAEvent)

//@desc for updating a event
//@route Put /admin/event
router.put("/events",adminController.upadteAEvent);

//@desc for deleting a event
//@route Delete /admin/event
router.delete("/events",adminController.deleteAEvent);


//@desc for adding new member
//@route /admin/member
router.post("/admin/member",adminController.addingNewMember)

//@desc for updating a member
//@route /admin/member
router.put("/admin/member",adminController.upadteAMember)

//@desc for deleting a member
//@route /admin/member
router.delete("/admin/member",adminController.deleteAMember);




module.exports = router;