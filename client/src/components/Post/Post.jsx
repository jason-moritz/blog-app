import './Post.css'
import { Link } from 'react-router-dom'

const Post = (props) => {
    return (
        <>
            <Link className="post" to={`/posts/${props._id}`}>
                <div className="post-name">{props.title}</div>
                <div className="author">{props.author}</div>
                <img className="post-image" src={props.imgURL} alt={props.name} />
                <p>{props.article}</p>
            </Link>
        </>
    )
}
export default Post