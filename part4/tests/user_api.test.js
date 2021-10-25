const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())

    await Promise.all(promiseArray)
})

describe('add users', () => {
    test('user without username is not added', async () => {
        const newUser = {
            name: 'Superuser',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({ error: 'User validation failed: username: Path `username` is required.' })

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('user with short username is not added', async () => {
        const newUser = {
            username: 'a',
            name: 'Superuser',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({ error: 'User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).' })

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('user with non-unique username is not added', async () => {
        const newUser = {
            username: helper.initialUsers[0].username,
            name: 'Superuser',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({ error: 'User validation failed: username: Error, expected `username` to be unique. Value: `root`' })

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('user without password is not added', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Superuser',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({ error: 'The password field is missing' })

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('user with short password is not added', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Superuser',
            password: 'a'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({ error: 'The password field is too short' })

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
