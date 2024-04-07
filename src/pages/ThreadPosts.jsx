import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Post } from "./Post.jsx"

// Displays posts for thread. Root post first then every other post
// Params: GroupId, PostId (First post for thread)
const ThreadPosts = ({groupId, postId}) => {
    const [posts, setPosts] = useState([])

    // TODO: Optimise this and pass all post parameters so that the Post component doesn't have to load
    // post from backend.
    return (
        <>
            <div>ThreadPosts (Lists all posts for a specific thread)</div>
            {posts.map(post => (     
                <Post id={post.id} />
            ))}
        </>
    )
}

export default ThreadPosts