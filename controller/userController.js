
const Events = require('../model/events')

const Users = require("../model/user");

const mail = require('../helper/mail')

module.exports = {
  bookEvents: async (req, res) => {
    try {
      const userId = req.payload.aud;
      const { eventId } = req.body;

      console.log(userId)

      if (!eventId)
        return res.status(503).json({ error: "select A event" })

      const Updated = await Events.findByIdAndUpdate(eventId, {
        $addToSet: { booked: [userId] }
      }, {
        new: true
      })

      // res.json(Updated)

      const userEmail = await Users.findById(userId, { _id: 0, email: 1, name: 1 })
      
      const { email, name } = userEmail;
      
      const text = `👋🏼 Hey ${name} Thanks for Book Our Event ${Updated.name} 
        🤗 Resourse Person :${Updated.resoursePerson}
        📍 Location: ${Updated.location} 📆 Date:${Updated.date} 
        ${Updated.meetUrl ? `Meet Link 🔗${Updated.meetUrl}` : ``}`
      mail(email, text)
      res.json("Thanks for Register Our Event")

    } catch (err) {
      console.log(err.message)
      res.status(500).json({ error: "Internal Server Error" })
    }



  }
}