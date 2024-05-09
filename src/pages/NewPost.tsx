import { useState, useEffect } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import { INewPost, INewPostProps, IPost, addPostServiceType } from '../Interfaces';
//import PropTypes from "prop-types";

// New post
// Params: None
//const NewPost = ({groupId, userId, rootPostId, parentPostId}) => {
//const NewPost = (props) => {
const NewPost = ({groupId, userId, rootPostId, parentPostId} : INewPostProps) => {
    const [postText, setPostText] = useState<string>("");
    const addPostService = useInject2<addPostServiceType>('addPostService');

    const navigate = useNavigate()
    
    // Updates post
    const addPost = async(post : INewPost) => {           
        // Update DB        
        const result = await addPostService(post);        
        
        // Clear post
        // TODO: Fix this
        //document.getElementById("newposttext_" + rootPostId).value = "";
        setPostText("");

        // Refresh page
        console.log("Navigating to /threadposts to refresh page");
        navigate("/threadposts?postid=" + rootPostId + "&groupid=" + groupId);        
    };

    // Handle save click
    const handleAddClick = async (e : any) => {                                                              
                //const newPostText = document.getElementById("newposttext_" + rootPostId).value;                
                if (postText.length > 0) {
                    await addPost({ groupId: groupId,
                             userId: userId,
                             text: postText,
                             rootPostId: rootPostId,
                             parentPostId: parentPostId
                            });                     
                } else {
                    window.alert("Cannot save post with no text");
                }                 
    }

    // Handle cancel edit click
    const handleCancelClick = async (e : any) => {       
        // TODO: Fix this
        //document.getElementById("newposttext_" + rootPostId)!.value! = "";        
        setPostText("");
    }    

    return (
        <li>            
            <textarea id={"newposttext_" + rootPostId} title="post" placeholder="placeholder" rows={3} cols={100} >{postText}</textarea>                
            <button id={"newpostadd_" + rootPostId} type="button" onClick={(e) => handleAddClick(e)}>Post</button>
            <button id={"newpostcancel_" + rootPostId} type="button" onClick={(e) => handleCancelClick(e)}>Cancel</button>
        </li>
    )
}

/*
NewPost.propTypes = {
    groupId : PropTypes.string.isRequired,
    userId : PropTypes.string.isRequired,
    rootPostId : PropTypes.string.isRequired,
    parentPostId : PropTypes.string.isRequired        
  };
*/

export default NewPost