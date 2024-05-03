import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo"
import { IPost } from '../Interfaces';

interface IRootPostProps {
    post: IPost
}

// Displays root post
// Params: Post
const RootPost = ({post} : IRootPostProps) => {
    //const [post, setPost] = useState([])

    const navigate = useNavigate()
      
    const handlePostClick = async (postId : string, groupId : string) => { 
        //e.preventDefault();                
        navigate("/threadposts?postid=" + postId + "&groupid=" + groupId);              
        //navigate(0);
    }
    
    return (
        <>
            <div>{post.Text}</div> 
            <UserInfo name={post.UserName} logo={post.UserLogo}/>           
            <button onClick={() => handlePostClick(post.ID, post.GroupID)}>Open</button>
        </>
    )
}

export default RootPost