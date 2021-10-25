const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.password) {
        const error = new Error('The password field is missing')
        error.name = 'ValidationError'
        throw(error)
    }

    if(body.password.length < 3) {
        const error = new Error('The password field is too short')
        error.name = 'ValidationError'
        throw(error)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter