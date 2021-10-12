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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
