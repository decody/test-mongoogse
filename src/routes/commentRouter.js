const { Router } = require('express')
const commentRouter = Router({ mergeParams: true }) // mergeParams: true 이면 Router에서 하위 Router로 한번 더 routing할 수 있음
const { User, Blog, Comment } = require('../models')
const { isValidObjectId } = require('mongoose')
const { httpResponseCode } = require('../config')

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR } = httpResponseCode

commentRouter.post('/', async (req, res) => {
  try {
    const { blogId } = req.params
    const { content, userId } = req.body
    if (!isValidObjectId(blogId))
      return res.status(BAD_REQUEST).send({ err: 'blogId is invalid' })
    if (!isValidObjectId(userId))
      return res.status(BAD_REQUEST).send({ err: 'userId is invalid' })
    if (typeof content !== 'string')
      return res.status(BAD_REQUEST).send({ err: 'content is required' })

    // const blog = await Blog.findById(blogId)
    // const user = await User.findById(userId)
    // 위 코드 대신  Promise.all()로 Blog와 User 동시에 각 id를 찾아 반환하여 시간을 단축시킬 수 있다.
    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ])
    if (!blog || !user)
      return res
        .status(BAD_REQUEST)
        .send({ err: 'blog or user does not exist' })

    if (!blog.islive)
      return res.status(BAD_REQUEST).send({ err: 'blog is not available' })
    const comment = new Comment({ content, user, blog })
    await comment.save()
    return res.send({ comment })
  } catch (err) {
    return res.status(BAD_REQUEST).send({ err: err.message })
  }
})

commentRouter.get('/', async (req, res) => {
  const { blogId } = req.params
  if (!isValidObjectId(blogId))
    return res.status(BAD_REQUEST).send({ err: 'blogId is invalid' })

  const comments = await Comment.find({ blog: blogId })
  return res.send({ comments })
})

module.exports = {
  commentRouter,
}
