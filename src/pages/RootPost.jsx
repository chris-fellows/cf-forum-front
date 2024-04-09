import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo"

// Displays root post
// Params: PostId
const RootPost = ({post}) => {
    //const [post, setPost] = useState([])

    const navigate = useNavigate()
      
    const handlePostClick = async (postId) => { 
        //e.preventDefault();                
        navigate("/threadposts?postid=" + postId);              
    }
    
    return (
        <>
            <div>{post.Text}</div>
            <UserInfo id={post.UserID} />
            <button onClick={() => handlePostClick(post.ID)}>Open</button>
        </>
    )
}

export default RootPost