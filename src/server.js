const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { User } = require('./models/User')

dotenv.config({ debug: true, override: true })

console.log('DB_USER', process.env.DB_USER)
console.log('DB_PASSWORD', process.env.DB_PASSWORD)

const PORT = process.env.PORT || 3000

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.px94k2q.mongodb.net/nodejsBlog?retryWrites=true&w=majority`

const server = async () => {

    try {
        // await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology : true })
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected')        
        app.use(express.json())

        app.get('/user', (req, res) => {
            // return res.send({ users })
        })
        
        app.post('/user', async (req, res) => {
            try {
                // const { name, age } = req.body
                // users.push({ name, age })
                let { username, name }  = req.body
                if (!username) return res.status(400).send({ err: 'username is required' })
                if (!name || !name.firstName || !name.lastName) {
                    return res.status(400).send({ err: 'Both first name and last name are required' })
                }
                const user = new User(req.body)
                await user.save()
                return res.send({ user })
            } catch (err) {
                console.log(err)
                return res.status(500).send({ err: err.message })
            }
        })
        
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

server()






