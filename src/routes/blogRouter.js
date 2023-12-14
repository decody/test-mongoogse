const { Router } = require('express')
const blogRouter = Router()
const { User, Blog } = require('../models')
const { commentRouter } = require('./commentRouter')
const { httpResponseCode } = require('../config')
const { isValidObjectId } = require('mongoose')

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR } = httpResponseCode

// comment는 어차피 blog 포스트에 종속적인 라우여서 추가
blogRouter.use('/:blogId/comment', commentRouter)

blogRouter.post('/', async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body
    if (typeof title !== 'string')
      return res.status(BAD_REQUEST).send({ err: 'title is required' })
    if (typeof content !== 'string')
      return res.status(BAD_REQUEST).send({ err: 'content is required' })
    if (islive && islive !== 'boolean')
      return res.status(BAD_REQUEST).send({ err: 'islive must be a boolena' })
    if (!isValidObjectId(userId))
      return res.status(BAD_REQUEST).send({ err: 'userId is invalid' })

    let user = await User.findById(userId)
    if (!user)
      return res.status(BAD_REQUEST).send({ err: 'user does not exist' })

    let blog = new Blog({ ...req.body, user })
    await blog.save()
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

blogRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    return res.send({ blogs })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

blogRouter.get('/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      res.status(INTERNAL_ERROR).send({ err: 'blogId is invalid' })

    const blog = await Blog.findOne({ _id: blogId })
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

blogRouter.put('/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      res.status(INTERNAL_ERROR).send({ err: 'blogId is invalid' })

    const { title, content } = req.body
    if (typeof title !== 'string')
      return res.status(INTERNAL_ERROR).send({ err: 'title is required' })
    if (typeof content !== 'string')
      return res.status(INTERNAL_ERROR).send({ err: 'content is required' })

    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title, content },
      { new: true },
    )
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

blogRouter.patch('/:blogId/live', async (req, res) => {
  try {
    const { blogId } = req.params
    if (!isValidObjectId(blogId))
      res.status(INTERNAL_ERROR).send({ err: 'blogId is invalid' })

    const { islive } = req.body
    if (typeof islive !== 'boolean')
      return res
        .status(INTERNAL_ERROR)
        .send({ err: 'boolean islive is required' })

    const blog = await Blog.findByIdAndUpdate(blogId, { islive }, { new: true })
    return res.send({ blog })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_ERROR).send({ err: err.message })
  }
})

module.exports = { blogRouter }
