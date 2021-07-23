const router = require('express').Router();

const {registerValidator} = require('../helper/validator');

const Auth = require('../controller/authController');

//@desc admin login
//@route post /auth/admin/login
router.post("/admin/login",registerValidator,Auth.adminLogin);

//@desc admin register
//@route post /auth/admin/register
router.post("/admin/register",registerValidator,Auth.adminRegister);


//@desc admin refreshToken
//@route post /auth/admin/refresh
router.post("/admin/refresh",Auth.adminrefreshToken);

//@desc admin logout
//@route post /auth/admin/logout
router.delete("/admin/logout",Auth.adminLogout);

//@desc user register
//@route post /auth/user/login
router.post("/user/register",registerValidator,Auth.userRegister);

//@desc user login
//@route post /auth/user/login
router.post("/user/login",registerValidator,Auth.userLogin);

//@desc user login
//@route post /auth/admin/login
router.post("/user/refresh",Auth.userrefreshToken);

//@desc user verify email
//@route get /auth/user/verify-email/:token
router.get("/user/verify-email/:token",Auth.verifyEmail)

//@desc user login
//@route post /auth/admin/login
router.post("/user/resend-verfiy-email",Auth.resendVerificationMail);


//@desc user logout
//@route post /auth/admin/logout
router.delete("/user/logout",Auth.userLogout);





module.exports = router;