const router = require('express').Router();

const allUsers = require('../controller/allController');

//@desc for showing our team
//@route /all/team
router.get("/team",allUsers.ShowCaseOurTeam)

//@desc for events
//@route /all/event
router.get("/event",allUsers.ourEvents)

//@desc for pre-event
//@route /all/pre-event
router.get("/pre-event",allUsers.previousEvent)

module.exports = router