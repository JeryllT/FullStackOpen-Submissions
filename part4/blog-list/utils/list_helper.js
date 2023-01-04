const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
    const sumFunc = (curSum, curObj) => {
        return curSum += curObj.likes
    }

    return blogs.reduce(sumFunc, 0)
}

const favoriteBlog = (blogs) => {
    const favFunc = (fav, curBlog) => {
        return (fav.likes > curBlog.likes) ? fav : curBlog
    }
    return blogs.reduce(favFunc, {})
}

module.exports = { dummy, totalLikes, favoriteBlog}

