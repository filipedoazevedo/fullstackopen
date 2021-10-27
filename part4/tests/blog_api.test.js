const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')
let test_user_token
let test_user_id
const test_secret = 'fullstackopen'

beforeAll(async () => {
    const usersInDb = await helper.usersInDb()
    const userForToken = {
        username: usersInDb[0].username,
        id: usersInDb[0].id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(
        userForToken,
        test_secret,
        { expiresIn: 60*60 }
    )

    test_user_token = token
    test_user_id = usersInDb[0].id
})

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog({
            ...blog,
            user: test_user_id
        }))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

describe('get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
        const [blog] = response.body

        expect(blog.id).toBeDefined()
    })
})

describe('add blogs', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://test.com',
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            newBlog.title
        )
    })

    test('if likes property is not given, set default value to 0', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://test.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            newBlog.title
        )
        expect(blogsAtEnd.pop().likes).toBeDefined()
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            author: 'Test Author',
            url: 'http://test.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${test_user_token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without a valid token is not added', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${test_user_token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog likes', () => {
    test('succeeds with the updated blog if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const blog_likes = 999

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${test_user_token}`)
            .send({ likes: blog_likes })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[0].likes).toEqual(
            blog_likes
        )
    })
})

afterAll(() => {
    mongoose.connection.close()
})
