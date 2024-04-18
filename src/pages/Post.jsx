import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
//import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo"
import getUserInfo from '../userInfo';

// Displays post
// Params: PostId
// TODO: Set isUserTheOwner correctly
const Post = ({post }) => {
    const userInfo = getUserInfo();     
    const [editState, setEditState] = useState({ 
        active: false,
        buttonText: "Edit"
    });

    const deletePostByIdService = useInject('deletePostByIdService');  
    const updatePostByIdService = useInject('updatePostByIdService');  
    const upvotePostByIdService = useInject('upvotePostByIdService');  
    const downvotePostByIdService = useInject('downvotePostByIdService');  

    // Determine if user is post owner    
    const isUserTheOwner = userInfo != undefined && userInfo.userId == post.UserID;
    console.log("Post:" + post.ID + "; isUserTheOwner=" + isUserTheOwner);

    // Handle upvote click
    const handleUpvoteClick = async () => {                   
        const result = await upvotePostByIdService(post.ID, post.UserID);        
        window.alert("Upvoted");
    }

    // Handle downvote click
    const handleDownvoteClick = async () => {         
        const result = await downvotePostByIdService(post.ID, post.UserID);        
        window.alert("Downvoted");
    }

    // Handle reply click
    // TODO: Create new post below current post
    const handleReplyClick = async () => {         
        window.alert("Reply");
    }

    // Handle delete click
    const handleDeleteClick = async () => {         
        window.alert("Delete");
        deletePostByIdService(post.ID);
    }

     // Updates post
    const updatePost = async(postId, details) => {           
        // Update DB        
        const result = await updatePostByIdService(postId, details);        

        // Update memory
        post.Text = details.text;

        // Set state
        setEditState({
            active: false,
            buttonText: "Edit"
        });
    };

    // Handle start edit or save edit click
    const handleEditClick = async (e) => {                
        switch(e.target.innerText)
        {
            case "Edit":
                setEditState({
                    active: true,
                    buttonText: "Save"
                });                
                break;
            case "Save":                         
                //const newPostText = document.getElementById("posttext_" + post.ID).innerHTML;
                const newPostText = document.getElementById("posttext_" + post.ID).value;
                //window.alert("New post text is " + newPostText);
                if (newPostText.length > 0) {                    
                    await updatePost(post.ID, { text: newPostText });                     
                } else {
                    window.alert("Cannot clear post text")
                }
                break;
        }                
    }

    // Handle cancel edit click
    const handleCancelEditClick = async (e) => {
        setEditState({
            active: false,
            buttonText: "Edit"
        }); 
        document.getElementById("posttext_" + post.ID).value = post.Text;
    }    
    
    return (
        <>
            <UserInfo name={post.UserName} logo={post.UserLogo}/><div>{post.CreatedDateTime}</div>            
            <textarea id={"posttext_" + post.ID} title="post" placeholder="placeholder" rows={3} cols={100} disabled={!editState.active}>{post.Text}</textarea>                
            {!isUserTheOwner && <button type="button" onClick={() => handleUpvoteClick()}>Upvote</button> }
            {!isUserTheOwner && <button type="button" onClick={() => handleDownvoteClick()}>Downvote</button> }
            {!isUserTheOwner && <button type="button" onClick={() => handleReplyClick()}>Reply</button> }
            {isUserTheOwner && <button type="button" onClick={(e) => handleEditClick(e)}>{editState.buttonText}</button> }
            {isUserTheOwner && editState.active && <button type="button" onClick={(e) => handleCancelEditClick(e)}>Cancel</button> }
            {isUserTheOwner && <button type="button" onClick={() => handleDeleteClick()}>Delete</button> }
        </>
    )
}

export default Post