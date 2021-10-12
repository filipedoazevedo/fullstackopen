const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, item) => {
        return (prev.likes > item.likes) ? prev : item
    }

    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.countBy(blogs, 'author')
    let maxBlogs = -1
    let maxBlogsResult = {}

    Object.keys(blogsByAuthor).forEach(author => {
        if(blogsByAuthor[author] >= maxBlogs) {
            maxBlogsResult = {
                author,
                blogs: blogsByAuthor[author]
            }

            maxBlogs = blogsByAuthor[author]
        }
    })

    return maxBlogsResult
}

const mostLikes = (blogs) => {
    const likesByAuthor =
            _(blogs)
                .groupBy('author')
                .map((objs, key) => ({
                    'author': key,
                    'likes': _.sumBy(objs, 'likes') }))
                .value()

    const mostLikesAuthor = _.maxBy(likesByAuthor, 'likes')

    return mostLikesAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
