
const { validationResult } = require('express-validator');

const Admin = require('../model/admin');

const User = require("../model/user")

const { siginAdminAccessToken, siginAdminRefreshToken, verifyAdminRefreshToken } = require('../helper/jwt_helper')

const bcrypt = require('bcrypt');

module.exports = {

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

                    res.json(newAdmin);
                    console.log(newAdmin)

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

    refreshToken: async (req, res) => {

        try {
            const { refreshToken } = req.body;

            if (!refreshToken)
                return res.status(401).json({ error: "ggg" });

            const userId = await verifyAdminRefreshToken(refreshToken)

            const accessToken = await siginAdminAccessToken(userId);
            const refToken = await siginAdminRefreshToken(userId); 

            console.log(userId)

             res.json({accessToken,refreshToken:refToken})

        } catch (error) {

            res.status(401).json({error:"Un Authrized User"})
            console.error(error)
        }


    }
}