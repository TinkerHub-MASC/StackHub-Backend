const router = require('express').Router();

const allUsers = require('../controller/allController');

router.get("/team",allUsers.ShowCaseOurTeam)

router.get("/event",allUsers.ourEvents)


module.exports = router