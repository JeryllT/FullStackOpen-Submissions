const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blog)
  })
  
blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)

    if (!decodedToken.id) return response.status(400).json({error: "Invalid token"})
    if (!body) return response.status(400).json({error: "Body Empty"})
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) return response.status(400).json({error: "Invalid Blog"})
  else if (!user) return response.status(400).json({error: "Invalid User or Token"})

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    const newBlogs = user.blogs.filter(blog => blog.toString() !==  request.params.id)
    user.blogs = newBlogs
    await user.save()
    response.status(204).end()
  } else {
    response.status(400).json({error: "blog post does not belong to user"})
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(400).json({error: "Invalid token"})

  const blog = {
    likes: body.likes
  }
  console.log(blog)

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter