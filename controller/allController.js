const Teams = require("../model/team");
const Events = require("../model/events")

module.exports = {

    ShowCaseOurTeam: async (req, res) => {

        const AllPersonsInTeam = await Teams.find();

        res.json(AllPersonsInTeam)

    },

    ourEvents: async (req, res) => {

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
                    fee:1,

                    year: { $year: "$date" },

                    month: { $month: "$date" },

                    day: { $dayOfMonth: "$date" },

                    hour:{$hour:"$date"},

                    minute:{$minute:"$date"},

                    




                }
            }
        ])

        res.json(upcomingEvent)
        /*  db.events.aggregate([{
             $addFields: { ff: { $gte: ["$date", new Date()] } }
         },
         { $match: { "ff": true } },
         {
             $project: {
                 year: { $year: "$date" },
                 location: 1
             }
         }]) */
    }
}