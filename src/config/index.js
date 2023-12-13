const dotenv = require('dotenv')

dotenv.config({ debug: true, override: true })

const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.px94k2q.mongodb.net/nodejsBlog?retryWrites=true&w=majority`

module.exports = {
  PORT,
  MONGO_URI,
}
