//events model
const Events = require("../model/events");

//team model
const Team = require("../model/team");
module.exports = {
    addingNewEvents: async (req, res) => {
        const { name, totalSeat, date, resoursePerson, meetUrl, pic, location, type } = req.body;
        if (!name || !totalSeat || !date || !resoursePerson)
            return res.json({ error: "enter all fields" });
        try {
            const newEvents = await new Events({
                name,
                totalSeat,
                date,
                resoursePerson,
                meetUrl,
                pic,
                type,
                location
            }).save()
            res.json(newEvents)
        } catch (err) {
            console.log("error in saving data in DB", err);
            res.status(500).json({ error: 'internal server error' })
        }

    },
getAEvent:async(req,res)=>{
        try {
            const {id} = req.params;
        const event = await Events.findById(id);
        if(!event){
            return res.json({error:"sorry wrong event"})
        }
        res.json(event)
        } catch (err) {
            console.log("error in geting an event data in DB", err);
            res.status(500).json({ error: 'internal server error' })

        }
        
},
   
upadteAEvent: async (req, res) => {
        const {
            _id,
            name,
            totalSeat,
            date,
            resoursePerson,
            meetUrl,
            pic,
            type,
            location
        } = req.body;
        if (!_id) return res.json({ error: "sorry wrong event" })
        try {
            const updatedEvent = await Events.findByIdAndUpdate(_id, {
                name,
                totalSeat,
                date,
                resoursePerson,
                meetUrl,
                pic,
                type,
                location
            })
            res.json("Updated suceesfuly");
            console.log(updatedEvent);

        } catch (err) {
            res.status(500).json({ error: "Internal server error" })
            console.log("error in adding new user", err);
        }
    },
    deleteAEvent: async (req, res) => {
        try {
            const { _id } = req.body;
            const deleted = await Events.findByIdAndDelete(_id);
            console.log(deleted);
            res.json("sucess");
        } catch (err) {
            console.log('error in deleting events:', err);
            res.json.status(500).json("Internal Server Error");
        }
    },


    addingNewMember: async (req, res) => {
        const { name, role, desc } = req.body;
        if (!name || !role)
            return res.json({ error: "enter all fields" });

        try {
            const newMember = await new Team({
                name,
                role,
                desc
            }).save()
            res.json(newMember)
        } catch (err) {
            res.status(500).json({ error: "internal server error" })
            console.log("error in adding new user", err);
        }


    },
    upadteAMember: async (req, res) => {
        const { name, role, desc, _id } = req.body;
        if (!_id) return res.json({ error: "enter all fields" })
        try {
            const updatedMember = await Team.findByIdAndUpdate(_id, {
                name,
                role,
                desc
            })
            res.json(updatedMember)

        } catch (err) {
            res.status(500).json({ error: "internal server error" })
            console.log("error in adding new user", err);
        }
    },
    deleteAMember: async (req, res) => {
        try {
            const { _id } = req.body;
            const deleted = await Team.findByIdAndDelete(_id);
            console.log(deleted);
            res.json("sucess");
        } catch (err) {
            console.log('error in deleting user', err);
            res.json.status(500).json("Internal Server Error");
        }
    }
}