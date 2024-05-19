//import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo"
import { IPost } from '../Interfaces';

interface IRootPostProps {
    post: IPost
}

// Displays root post
// Params: Post
const RootPost = ({post} : IRootPostProps) => {    
    //const navigate = useNavigate()
      
    /*
    const handlePostClick = async (postId : string, groupId : string) => {         
        navigate("/threadposts?postid=" + postId + "&groupid=" + groupId);                      
    }
    */

    /*
    <li>
            <div>{post.Text}</div> 
            <UserInfo name={post.UserName} logo={post.UserLogo}/>           
            <button onClick={() => handlePostClick(post.ID, post.GroupID)}>Open</button>
        </li>
    */        
    
    return (
        <tr key={post.ID}>        
            <td className="RootPostsTableCell"><UserInfo name={post.UserName} logo={post.UserLogo}/> </td>
            <td className="RootPostsTableCell">{post.CreatedDateTime}</td>                                      
            <td className="RootPostsTableCell">{post.Text}</td>                                      
            <td className="RootPostsTableCell"><Link to={"/threadposts?postid=" + post.ID + "&groupid=" + post.GroupID}>Posts</Link></td>                
        </tr>
    )
}

export default RootPost