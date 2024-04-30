import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";

// New post
// Params: None
const NewPost = ({groupId, userId, rootPostId, parentPostId}) => {
    const addPostService = useInject('addPostService');

    const navigate = useNavigate()
    
    // Updates post
    const addPost = async(post) => {           
        // Update DB        
        const result = await addPostService(post);
        
        // Clear post
        document.getElementById("newposttext_" + rootPostId).value = "";

        // Refresh page
        console.log("Navigating to /threadposts to refresh page");
        navigate("/threadposts?postid=" + rootPostId + "&groupid=" + groupId);        
    };

    // Handle save click
    const handleAddClick = async (e) => {                              
                //const newPostText = document.getElementById("posttext_" + post.ID).innerHTML;
                const newPostText = document.getElementById("newposttext_" + rootPostId).value;
                //window.alert("New post text is " + newPostText);
                if (newPostText.length > 0) {
                    await addPost({ groupId: groupId,
                             userId: userId,
                             text: newPostText,
                             rootPostId: rootPostId,
                             parentPostId: parentPostId
                            });                     
                } else {
                    window.alert("Cannot save post with no text");
                }        
    }

    // Handle cancel edit click
    const handleCancelClick = async (e) => {       
        document.getElementById("newposttext_" + rootPostId).value = "";
    }    

    return (
        <>            
            <textarea id={"newposttext_" + rootPostId} title="post" placeholder="placeholder" rows={3} cols={100} >New post</textarea>                
            <button id={"newpostadd_" + rootPostId} type="button" onClick={(e) => handleAddClick(e)}>Post</button>
            <button id={"newpostcancel_" + rootPostId} type="button" onClick={(e) => handleCancelClick(e)}>Cancel</button>
        </>
    )
}

export default NewPost