
const { validationResult } = require('express-validator');

const Admin = require('../model/admin');

const User = require("../model/user");

const client = require('../helper/redis_init')

const {
    siginAccessToken,
    siginRefreshToken,
    verifyRefreshToken,
    verifyEmailToken
} = require('../helper/jwt_helper')

const bcrypt = require('bcrypt');

module.exports = {

    //admin auth

    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(404).json({ error: "Enter Username/Password" })

            const error = validationResult(req);


            if (!error.isEmpty) {
                console.log(error)

                return res.json({ error: error })
            }
            const userFound = await Admin.findOne({ email });

            if (!userFound)
                return res.status(403).json({ error: "Wrong Username/Password" });

            const isMatch = await bcrypt.compare(password, userFound.password);

            if (!isMatch)
                return res.status(403).json({ error: "Wrong Username/Password" });

            const secret = process.env.Admin_AcessToken_Secret;
            const refSecret = process.env.Admin_RefreshToken_Secret;

            const accessToken = await siginAccessToken(userFound._id, secret);
            const refreshToken = await siginRefreshToken(userFound._id, refSecret);


            res.json({ accessToken, refreshToken });

        } catch (err) {
            console.log(err.message);
            res.json({ error: err.message })
        }



    },

    adminRegister: async (req, res) => {
        try {



            const { email, password } = req.body;

            if (!email || !password)
                return res.status(404).json({ error: "Enter Username/Password" })


            const error = validationResult(req);

            if (!error.isEmpty) {
                console.log(error)

                return res.json({ error: error })
            }
            const isExisits = await Admin.findOne({ email });

            if (isExisits) {
                return res.json({ error: "User alerady registerd this email" });
            }

            const saltRound = 10;
            bcrypt.genSalt(saltRound, (err, salt) => {

                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: "Internal Server Error" })
                }

                bcrypt.hash(password, salt, async (err, hashedPassword) => {

                    const newAdmin = await new Admin({

                        email,

                        password: hashedPassword
                    }).save()

                    const secret = process.env.Admin_AcessToken_Secret;
                    const refSecret = process.env.Admin_RefreshToken_Secret;

                    const accessToken = await siginAccessToken(newAdmin._id, secret);
                    const refreshToken = await siginRefreshToken(newAdmin._id, refSecret);

                    res.json({ accessToken, refreshToken })


                    if (err) {
                        console.log(err.message);
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                })
            })


        } catch (err) {

            res.json({ error: err.message })

            console.log(err.message)
        }
    },

    adminrefreshToken: async (req, res) => {

        try {
            const { refreshToken } = req.body;

            if (!refreshToken)
                return res.status(401).json({ error: "ggg" });

            const secret = process.env.Admin_AcessToken_Secret;
            const refSecret = process.env.Admin_RefreshToken_Secret;

            const userId = await verifyRefreshToken(refreshToken, refSecret)



            const accessToken = await siginAccessToken(userId, secret);
            const refToken = await siginRefreshToken(userId, refSecret);

            console.log(userId)

            res.json({ accessToken, refreshToken: refToken })

        } catch (error) {

            res.status(401).json({ error: "Un Authrized User" })
            console.error(error)
        }


    },

    adminLogout: async (req, res) => {
        try {
            const { refershToken } = req.body;

            const refSecret = process.env.Admin_RefreshToken_Secret;

            if (!refershToken) return res.status(503).json({ error: "Bad Request" });

            const userId = await verifyRefreshToken(refershToken, refSecret);


            client.DEL(userId, (err, val) => {

                if (err) {

                    console.log(err.message)
                    res.status(500).json({ error: "Internal Server Error" });
                }
                console.log(val);
                res.sendStatus(204)
            })
        } catch (err) {
            console.log(err.message);
            res.json({ error: err.message })
        }
    },

    //user auth

    userRegister: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(404).json({ error: "enter all fields" });

        try {

            const error = validationResult(req);

            if (!error.isEmpty) {
                console.log(error)

                return res.json({ error: error })
            }

            const isExisitsUser = await User.findOne({ email })

            if (isExisitsUser)
                return res.json({ error: "User already registered" })



            const saltRound = 10;
            bcrypt.genSalt(saltRound, (err, salt) => {

                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: "Internal Server Error" })
                }

                bcrypt.hash(password, salt, async (err, hashedPassword) => {

                    const newUser = await new User({

                        name,
                        email,
                        password: hashedPassword

                    }).save()



                    const secret = process.env.Verfiy_Email_Secret;
                    //const refSecret = process.env.User_RefreshToken_Secret

                    const Token = await siginAccessToken(newUser._id, secret);
                    const verfiyEmailLink = `http://localhost:5000/auth/user/verify-email/${Token}`
                    //const refreshToken = await siginRefreshToken(newUser._id,refSecret);
                    console.log(verfiyEmailLink)
                    res.json('Hey we send verification mail to your registerd email')
                    

                    if (err) {
                        console.log(err.message);
                        return res.status(500).json({ error: "Internal Server Error" })
                    }
                })
            })


        } catch (err) {

            res.status(500).json({ error: "internal server error" })
            console.log("error in register new user", err.message);
        }



    },

    verifyEmail: async (req, res) => {
        try {
            const { token } = req.params;

            const userId = await verifyEmailToken(token);

            const alreadyVerifyedUser = await User.findById(userId);

            if(alreadyVerifyedUser.isVerfiyed)
                return res.json({error:"User Already Verifyed"});

            const verfiyedUser = await User.findByIdAndUpdate(userId, {
              
                isVerfiyed: true
            })

            res.json(`Hey ${verfiyedUser.name} Your Registered Email is Succesfuly Verfiyed`)

        } catch (err) {

            console.error(err.message)
            return res.status(401).json({ error:err.message })

        }



    },

    resendVerificationMail:async(req,res)=>{
        try {
             const {email} = req.body;
            
            if(!email)
                return res.status(404).json({error:"Please Enter Valid Email"});

            const userData = await User.findOne({email},{_id:1,name:1,isVerfiyed:1});

            if(!userData)
                return res.json({error:"User Not Registerd"})
            
            console.log(userData)

            if(userData.isVerfiyed)
                 return res.json({error:"User Already Verifyed"})

            const secret = process.env.Verfiy_Email_Secret;

            const Token = await siginAccessToken(userData._id, secret);
            const verfiyEmailLink = `http://localhost:5000/auth/user/verify-email/${Token}`

            //const refreshToken = await siginRefreshToken(newUser._id,refSecret);
            console.log(verfiyEmailLink)
            res.json(`Hey ${userData.name} we send verification mail to your registerd email`)
            
        } catch (err) {
            console.log(err.message)
        }

           

    },

    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(404).json({ error: "Enter Username/Password" })

            const error = validationResult(req);


            if (!error.isEmpty) {
                console.log(error)

                return res.json({ error: error })
            }
            const userFound = await User.findOne({ email });

            if (!userFound)
                return res.status(403).json({ error: "Wrong Username/Password" });

            const isMatch = await bcrypt.compare(password, userFound.password);

            if (!isMatch)
                return res.status(403).json({ error: "Wrong Username/Password" });

            const secret = process.env.User_AcessToken_Secret;
            const refSecret = process.env.User_RefreshToken_Secret

            const accessToken = await siginAccessToken(userFound._id, secret);
            const refreshToken = await siginRefreshToken(userFound._id, refSecret);


            res.json({ accessToken, refreshToken });

        } catch (err) {
            console.log(err.message);
            res.json({ error: err.message })
        }



    },

    userrefreshToken: async (req, res) => {

        try {
            const { refreshToken } = req.body;

            if (!refreshToken)
                return res.status(401).json({ error: "Un Authrized User" });

            const refSecret = process.env.User_RefreshToken_Secret;
            const secret = process.env.User_AcessToken_Secret;

            const userId = await verifyRefreshToken(refreshToken, refSecret)

            const accessToken = await siginAccessToken(userId, secret);
            const refToken = await siginRefreshToken(userId, refSecret);

            console.log(userId)

            res.json({ accessToken, refreshToken: refToken })

        } catch (error) {

            res.status(401).json({ error: "Un Authrized User" })
            console.error(error)
        }


    },

    userLogout: async (req, res) => {
        try {
            const { refershToken } = req.body;

            if (!refershToken) return res.status(503).json({ error: "Bad Request" });

            const refSecret = process.env.User_RefreshToken_Secret;
            const userId = await verifyRefreshToken(refershToken, refSecret);


            client.DEL(userId, (err, val) => {

                if (err) {

                    console.log(err.message)
                    res.status(500).json({ error: "Internal Server Error" });
                }
                console.log(val);
                res.sendStatus(204)
            })
        } catch (err) {
            console.log(err.message);
            res.json({ error: err.message })
        }
    }


}