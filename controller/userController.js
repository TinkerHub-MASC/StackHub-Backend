
const User = require("../model/user")
module.exports = {
        siginup:async(req,res)=>{
            const {name,email,phone,career} = req.body;
             if(!name) 
            return res.json({error:"enter all fields"});
            try {
                
            const newUser = await new User({
                name,
                email,
                phone,
                career
            }).save()
            console.log(newUser);
            res.json("sucess")
            } catch (err) {
                 res.status(500).json({ error: "internal server error" })
            console.log("error in register new user", err);
            }
           


        }
}