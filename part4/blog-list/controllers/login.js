const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body
    
    const existingUser = await User.findOne({username})
    const correctPass = password === null
        ? false
        : await bcrypt.compare(password, existingUser.passwordHash)
    
    if (!(existingUser && correctPass)) {
        return response.status(400).json({error: "Invalid Credentials"})
    }

    const user = {
        username: existingUser.username,
        id: existingUser._id
    }

    const token = jwt.sign(user, process.env.SECRET)

    response.status(200)
        .json({token, username: existingUser.username, name: existingUser.name})
})

module.exports = loginRouter