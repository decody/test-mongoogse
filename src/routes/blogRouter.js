const { Router } = require('express')
const blogRouter = Router()
const { Blog } = require('../models/Blog')
const { User } = require('../models/User')
const { isValidObjectId } = require('mongoose')

blogRouter.post('/', async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body
    if (typeof title !== 'string')
      return res.status(400).send({ err: 'title is required' })
    if (typeof content !== 'string')
      return res.status(400).send({ err: 'content is required' })
    if (islive && islive !== 'boolena')
      return res.status(400).send({ err: 'islive must be a boolena' })
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: 'userId is invalid' })

    let user = await User.findById(userId)
    if (!user) return res.status(400).send({ err: 'user does not exist' })

    let blog = new Blog({ ...req.body, user })
    await blog.save()
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.get('/', async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.get('/:blogId', async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.put('/:blogId', async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

blogRouter.patch('/:blogId/live', async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
})

module.exports = { blogRouter }
