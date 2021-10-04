import Post from '../models/post.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

// export const getPost = async (req, res) => {
//     try {

//     } catch () {
        
//     }
// }