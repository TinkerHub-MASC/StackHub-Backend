const router = require('express').Router();

const allUsers = require('../controller/allController');

router.get("/team",allUsers.ShowCaseOurTeam)

module.exports = router