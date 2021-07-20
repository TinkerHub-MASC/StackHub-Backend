const router = require('express').Router();

const {registerValidator} = require('../helper/validator');

const Auth = require('../controller/authController');

router.post("/admin/login",registerValidator,Auth.adminLogin);

router.post("/admin/register",registerValidator,Auth.adminRegister);

router.post("/admin/refresh",Auth.refreshToken);


module.exports = router;