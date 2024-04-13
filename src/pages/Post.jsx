import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo"
import getUserInfo from '../userInfo';

// Displays post
// Params: PostId
// TODO: Set isUserTheOwner correctly
const Post = ({post }) => {
    const userInfo = getUserInfo(); 
    const deletePostByIdService = useInject('deletePostByIdService');  

    // Determine if user is post owner    
    const isUserTheOwner = userInfo != undefined && userInfo.userId == post.UserID;
    console.log("Post:" + post.ID + "; isUserTheOwner=" + isUserTheOwner);

    const handleUpvoteClick = async () => {           
        window.alert("Upvoted");
    }

    const handleDownvoteClick = async () => {         
        window.alert("Downvoted");
    }

    const handleReplyClick = async () => {         
        window.alert("Reply");
    }

    const handleDeleteClick = async () => {         
        window.alert("Delete");
        deletePostByIdService(post.ID);
    }

    const handleEditClick = async () => {         
        window.alert("Edit");
    }
    
    return (
        <>
            <div>{post.Text}</div>            
            <UserInfo name={post.UserName} logo={post.UserLogo}/>
            {!isUserTheOwner && <button onClick={() => handleUpvoteClick()}>Upvote</button> }
            {!isUserTheOwner && <button onClick={() => handleDownvoteClick()}>Downvote</button> }
            {!isUserTheOwner && <button onClick={() => handleReplyClick()}>Reply</button> }
            {isUserTheOwner && <button onClick={() => handleEditClick()}>Edit</button> }
            {isUserTheOwner && <button onClick={() => handleDeleteClick()}>Delete</button> }
        </>
    )
}

export default Post