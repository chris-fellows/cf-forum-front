import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo"

// Displays post
// Params: PostId
const Post = ({post}) => {
    //const [post, setPost] = useState([])
    
    return (
        <>
            <div>{post.Text}</div>
            <UserInfo id={post.UserID} />
        </>
    )
}

export default Post