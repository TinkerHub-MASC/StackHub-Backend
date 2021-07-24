const Teams = require("../model/team");

module.exports = {

    ShowCaseOurTeam: async (req, res) => {

        const AllPersonsInTeam = await Teams.find();

        res.json(AllPersonsInTeam)

    }
}