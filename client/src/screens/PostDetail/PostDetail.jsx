import { useState, useEffect } from 'react'
import './PostDetail.css'
import Layout from '../../components/Layout/Layout'
import { getPost, deletePost } from '../../services/posts'
import { useParams, Link, useHistory } from 'react-router-dom'

const PostDetail = (props) => {

    const [post, setPost] = useState(null)
    const [isLoaded, setLoaded] = useState(false)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getPost(id)
            setPost(post)
            setLoaded(true)
        }
        fetchPost()
    }, [id])

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }

    const handleDelete = async(e) => {
        e.preventDefault()

        await deletePost(id)
        history.push('/posts')
    }

    return (
        <Layout>
            <div className="post-detail">
                <img className="post-detail-image" src={post.imgURL} alt={post.title} />
                <div className="detail">
                    <div className="title">{post.title}</div>
                    <div className="author">{`${post.author}`}</div>
                    <div className="article">{post.article}</div>
                    <div className="button-container">
                        <button className="edit-button"><Link className="edit-link" to={`/posts/${post._id}/edit`}>Edit</Link></button>
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostDetail