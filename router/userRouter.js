const router = require('express').Router();

const User = require("../controller/userController")

router.put("/events/register", User.bookEvents);

module.exports = router;