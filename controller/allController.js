const Teams = require("../model/team");
const Events = require("../model/events")

module.exports = {

    ShowCaseOurTeam: async (req, res) => {

        try {
            const AllPersonsInTeam = await Teams.find();

            res.json(AllPersonsInTeam)
        } catch (err) {

            console.error(err.message);
            return res.status(500).json({ error: "Internal Server Error" });

        }



    },

    ourEvents: async (req, res) => {
        try {
            const upcomingEvent = await Events.aggregate([
                {
                    $addFields: { isNotOver: { $gte: ["$date", new Date()] } }
                },
                { $match: { "isNotOver": true } },
                {
                    $project:
                    {
                        name: 1,
                        type: 1,
                        location: 1,
                        totalSeat: 1,
                        pic: 1,
                        resoursePerson: 1,
                        fee: 1,

                        year: { $year: "$date" },

                        month: { $month: "$date" },

                        day: { $dayOfMonth: "$date" },

                        hour: { $hour: "$date" },

                        minute: { $minute: "$date" },

                        availableSeat: { $subtract: ["$totalSeat", { $size: "$booked" }] }


                    }
                }
            ])

            res.json(upcomingEvent)
        } catch (err) {

            console.error(err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }



    },

    previousEvent: async(req,res)=>{
        
        const previousEvent = await Events.aggregate([
            {
                $addFields: { isOver: { $lt: ["$date", new Date()] } }
            },
            { $match: { "isOver": true } },
            {
                $project:
                {
                    name: 1,
                    type: 1,
                    location: 1,
                    totalSeat: 1,
                    pic: 1,
                    resoursePerson: 1,
                    fee: 1,

                    year: { $year: "$date" },

                    month: { $month: "$date" },

                    day: { $dayOfMonth: "$date" },

                    hour: { $hour: "$date" },

                    minute: { $minute: "$date" },

                    particepant: {    $size: "$booked"  }


                }
            }
        ])

        res.json(previousEvent)
    }
}