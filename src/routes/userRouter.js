const { Router } = require('express')
const userRouter = Router()
const { httpResponseCode } = require('../config')
const { User } = require('../models/User')

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR } = httpResponseCode

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    return res.send({ users })
  } catch (err) {
    console.log(err)
    return res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

userRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    // mongoose에서 objectId인지 아닌지 판단
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(BAD_REQUEST).send({ err: 'Invalid userId' })
    }
    const user = await User.findOne({ _id: userId })
    return res.send({ user })
  } catch (err) {
    console.log(err)
    return res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

userRouter.post('/', async (req, res) => {
  try {
    // const { name, age } = req.body
    // users.push({ name, age })
    let { username, name } = req.body
    if (!username)
      return res.status(BAD_REQUEST).send({ err: 'username is required' })
    if (!name || !name.firstName || !name.lastName) {
      return res
        .status(BAD_REQUEST)
        .send({ err: 'Both first name and last name are required' })
    }
    const user = new User(req.body)
    await user.save()
    return res.send({ user })
  } catch (err) {
    console.log(err)
    return res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

userRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(BAD_REQUEST).send({ err: 'Invalid userId' })
    }
    const user = await User.findOneAndDelete({ _id: userId })
    return res.send({ user })
  } catch (err) {
    console.log(err)
    return res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

userRouter.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(BAD_REQUEST).send({ err: 'Invalid userId' })
    }
    const { age, name } = req.body
    if (!age && !name) {
      return res.status(BAD_REQUEST).send({ err: 'age or name is required' })
    }
    if (age && typeof age !== 'number') {
      return res.status(BAD_REQUEST).send({ err: 'age must be a number' })
    }
    if (
      name &&
      typeof name.firstName !== 'string' &&
      typeof name.lastName !== 'string'
    ) {
      return res
        .status(BAD_REQUEST)
        .send({ err: 'first name and last name are strings' })
    }
    // let updateBody = {}
    // if (age) updateBody.age = age
    // if (name) updateBody.name = name

    // const user = await User.findOneAndUpdate(
    //   userId,
    //   { $set: { updateBody } },
    //   { new: true },
    // )
    let user = await User.findById(userId)
    if (age) user.age = age
    if (name) user.name = name
    await user.save()
    return res.send({ user })
  } catch (err) {
    console.log(err)
    return res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

module.exports = {
  userRouter,
}
