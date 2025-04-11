import { useState, useEffect, useRef } from "react"
import { useInject2 } from "../useInject";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';
import { IPost } from '../Interfaces';
import { IPostsService } from "../serviceInterfaces";

interface IPostProps {
    post: IPost
}

// Displays user post (Read only) when displaying all posts for specific user (No need to display user info)
// Params: PostId
const UserPost = ({ post } : IPostProps) => {
    const userInfo = getUserInfo();    
    const navigate = useNavigate()  
    
    const postsService = useInject2<IPostsService>('postsService');      

    // Determine if user is post owner    
    const isUserTheOwner = userInfo != undefined && userInfo.userId == post.UserID;    

    // Handle open thread
    const handleOpenRootPostClick = async () => {         
        navigate("/threadposts?postid=" + post.RootPostID + "&groupid=" + post.GroupID);                      
    }

    // Handle delete click
    const handleDeleteClick = async () => {         
        window.alert("Delete");
        postsService.DeletePostById(post.ID);
    }
    
    return (
        <li>
            <p>Posted: {post.CreatedDateTime}</p>                        
            <textarea id={"posttext_" + post.ID} title="post" placeholder="placeholder" rows={3} cols={100} disabled={true}>{post.Text}</textarea>                            
            {isUserTheOwner && <button type="button" onClick={() => handleOpenRootPostClick()}>Open Thread</button> }
            {isUserTheOwner && <button type="button" onClick={() => handleDeleteClick()}>Delete</button> }            
        </li>
    )
}

export default UserPost