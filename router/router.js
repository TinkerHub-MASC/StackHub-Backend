const router = require('express').Router();
const adminController = require('../controller/adminController');
const userControler = require("../controller/userController");
//@desc 
router.get("/",userControler.hello);

//admin

//@desc for adding new events
//@route /api/admin/events
router.post("/admin/events",adminController.addingNewEvents)

//@desc for adding new member
//@route /api/admin/member
router.post("/admin/member",adminController.addingNewMember)

module.exports = router;