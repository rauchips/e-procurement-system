require('dotenv').config()

MongoURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.duhc0.mongodb.net/E_Procurement_System?retryWrites=true&w=majority`

module.exports = { MongoURI }