const express = require('express')
const app = express()

const PORT = 3000
const users = []

app.use(express.json())

app.get('/user', (req, res) => {
    return res.send({ users })
})

app.post('/user', (req, res) => {
    const { name, age } = req.body
    users.push({ name, age })
    return res.send({ success: true })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})