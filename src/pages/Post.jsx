import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./UserInfo.jsx"

// Displays post
// Params: PostId
const Post = ({id}) => {
    const [post, setPost] = useState([])

    return (
        <>
            <div>Post</div>
            <UserInfo id={post.UserId} />
        </>
    )
}

export default Post