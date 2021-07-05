const router = require('express').Router();
const adminController = require('../controller/adminController');
const userControler = require("../controller/userController");
//@desc 
router.post("/",userControler.siginup);

//admin

//@desc for adding new events
//@route /api/admin/events
router.post("/admin/events",adminController.addingNewEvents)

//@desc for geting a event
//@route /api/admin/events
router.get("/admin/events/:id",adminController.getAEvent)

//@desc for updating a event
//@route /api/admin/event
router.put("/admin/events",adminController.upadteAEvent);

//@desc for deleting a event
//@route /api/admin/event
router.delete("/admin/events",adminController.deleteAEvent);


//@desc for adding new member
//@route /api/admin/member
router.post("/admin/member",adminController.addingNewMember)

//@desc for updating a member
//@route /api/admin/member
router.put("/admin/member",adminController.upadteAMember)

//@desc for deleting a member
//@route /api/admin/member
router.delete("/admin/member",adminController.deleteAMember)

module.exports = router;