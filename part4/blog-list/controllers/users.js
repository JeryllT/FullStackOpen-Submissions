const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs', {url:1, title: 1, author: 1, id: 1})
    response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
    const {username, password, name} = request.body

    const dupUser = await User.findOne({username: username})

    if (!username || username.length < 3) {
        return response.status(400).json({error: "Username cannot be blank and must be longer than 3 chars"})
    }
    else if (!password || password.length < 3) {
        return response.status(400).json({error: "Password cannot be blank and must be longer than 3 chars"})
    }
    else if (dupUser) return response.status(400).json({error: "user already exist"})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        passwordHash,
        name
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter