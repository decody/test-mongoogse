const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ debug: true, override: true })
const { userRouter, blogRouter } = require('./routes')
// const { userRouter } = require('./routes/userRouter')
// const { blogRouter } = require('./routes/blogRouter')
const { dev } = require('./config')
const mongoose = require('mongoose')

const server = async () => {
  try {
    // 주석된 option 전부 deprecation
    // mongoose.set('useFindAndModify', false)
    // await mongoose.connect(dev.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    await mongoose.connect(dev.dbURI)
    mongoose.set('debug', true) // 디버그 모드
    console.log('MongoDB connected')
    app.use(express.json())

    app.use('/user', userRouter)
    app.use('/blog', blogRouter)

    app.listen(dev.port, () => {
      console.log(`listening on port ${dev.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server()
