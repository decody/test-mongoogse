const express = require('express')
const app = express()
const { userRouter } = require('./routes/userRouter')
const { blogRouter } = require('./routes/blogRouter')
const { PORT, MONGO_URI } = require('./config')
const mongoose = require('mongoose')

const server = async () => {
  try {
    // 주석된 option 전부 deprecation
    // mongoose.set('useFindAndModify', false)
    // await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    await mongoose.connect(MONGO_URI)
    mongoose.set('debug', true) // 디버그 모드
    console.log('MongoDB connected')
    app.use(express.json())

    app.use('/user', userRouter)
    app.use('/blog', blogRouter)

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server()
