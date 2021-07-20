
const { validationResult } = require('express-validator');

const Admin = require('../model/admin');

const User = require("../model/user");

const client = require('../helper/redis_init')

const {
    //admin
    siginAdminAccessToken,
    siginAdminRefreshToken,
    verifyAdminRefreshToken,

    //user
    siginUserAccessToken,
    siginUserRefreshToken,
    verifyUserRefreshToken
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

            const accessToken = await siginAdminAccessToken(userFound._id);
            const refreshToken = await siginAdminRefreshToken(userFound._id);


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

                    const accessToken = await siginAdminAccessToken(newAdmin._id);
                    const refreshToken = await siginAdminRefreshToken(newAdmin._id);

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

            const userId = await verifyAdminRefreshToken(refreshToken)

            const accessToken = await siginAdminAccessToken(userId);
            const refToken = await siginAdminRefreshToken(userId);

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

            if (!refershToken) return res.status(503).json({ error: "Bad Request" });

            const userId = await verifyAdminRefreshToken(refershToken);


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
            res.json({error:err.message})
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

                    const accessToken = await siginUserAccessToken(newUser._id);
                    const refreshToken = await siginUserRefreshToken(newUser._id);

                    res.json({ accessToken, refreshToken })

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

            const accessToken = await siginUserAccessToken(userFound._id);
            const refreshToken = await siginUserRefreshToken(userFound._id);


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
                return res.status(401).json({ error: "ggg" });

            const userId = await verifyUserRefreshToken(refreshToken)

            const accessToken = await siginUserAccessToken(userId);
            const refToken = await siginUserRefreshToken(userId);

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

            const userId = await verifyUserRefreshToken(refershToken);


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
            res.json({error:err.message})
        }
    }


}