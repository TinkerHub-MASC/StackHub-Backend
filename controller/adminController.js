//events model
const Events = require("../model/events");

//team model
const Team = require("../model/team");
module.exports = {
    addingNewEvents: async (req, res) => {
        const { name, totalSeat, date, resoursePerson } = req.body;
        if (!name || !totalSeat || !date || !resoursePerson)
            return res.json("enter all fields");
        try {
            const newEvents = await new Events({
                name,
                totalSeat,
                date,
                resoursePerson
            }).save()
            res.json(newEvents)
        } catch (err) {
            console.log("error in saving data in DB", err);
            res.status(500).json({error:'internal server error'})
        }

    },
    addingNewMember: async (req, res) => {
        const { name, role,desc } = req.body;
        if (!name || !role)
            return res.json("enter all fields");

        try {
            const newMember = await new Team({
                name,
                role,
                desc
            }).save()
            res.json(newMember)
        } catch (err) {
                res.status(500).json({error:"internal server error"})
            console.log("error in adding new user",err);
        }


    }
}