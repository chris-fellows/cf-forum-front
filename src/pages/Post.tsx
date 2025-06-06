import { useState, useEffect, useRef } from "react"
import { useInject2 } from "../useInject";
import UserInfo from "./UserInfo"
import getUserInfo from '../userInfo';
import { IPost } from '../Interfaces';
import { IPostsService } from "../serviceInterfaces";

interface IPostProps {
    post: IPost
}

interface IState {
    active: boolean
    buttonText: string
}

// Displays post
// Params: PostId
const Post = ({ post } : IPostProps) => {
    const userInfo = getUserInfo();      
    const [vote, setVote] = useState<number>(post.UserPostInfoVote);    
    const [postText, setPostText] = useState<string>(post.Text);
    //const [track, setTrack] = useState(post.UserPostInfoTrack);
    const [editState, setEditState] = useState<IState>({ 
        active: false,
        buttonText: "Edit"
    });
    const voteUpvoted = 1;
    const voteDownvoted = 2;

    const postsService = useInject2<IPostsService>('postsService');      

    // Determine if user is post owner    
    const isUserTheOwner = userInfo != undefined && userInfo.userId == post.UserID;
    //console.log("Post:" + post.ID + "; isUserTheOwner=" + isUserTheOwner);

    // Handle upvote click
    const handleUpvoteClick = async () => {                   
        const result = await postsService.VotePostById(post.ID, { userId: post.UserID, vote: voteUpvoted });        
        setVote(voteUpvoted);
        //window.alert("Upvoted");
    }

    // Handle downvote click
    const handleDownvoteClick = async () => {         
        const result = await postsService.VotePostById(post.ID, { userId: post.UserID, vote: voteDownvoted });        
        setVote(voteDownvoted);
        //window.alert("Downvoted");
    }

    // Handle reply click
    // TODO: Create new post below current post
    const handleReplyClick = async () => {         
        window.alert("Reply");
    }

    // Handle delete click
    const handleDeleteClick = async () => {         
        window.alert("Delete");
        postsService.DeletePostById(post.ID);
    }

     // Updates post
    const updatePost = async(postId : string, details : any) => {           
        // Update DB        
        const result = await postsService.UpdatePostById(postId, details);        

        // Update memory
        post.Text = details.text;

        // Set state
        setEditState({
            active: false,
            buttonText: "Edit"
        });
    };

    // Handle start edit or save edit click
    const handleEditClick = async (e : any) => {                
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
                //const newPostText = document.getElementById("posttext_" + post.ID).value;
                //window.alert("New post text is " + newPostText);
                if (postText.length > 0) {                    
                    await updatePost(post.ID, { text: postText });                     
                } else {
                    window.alert("Cannot clear post text")
                }                
                break;
        }                
    }

    // Handle cancel edit click
    const handleCancelEditClick = async (e : any) => {
        setEditState({
            active: false,
            buttonText: "Edit"
        }); 
        // TODO: Fix this
        //document.getElementById("posttext_" + post.ID).value = post.Text;        
        //console.log("Resetting post text");
        setPostText(post.Text);
        //console.log("Reset post text to " + post.Text);
    }    

    // Vote: 0=None, 1=Upvoted, 2=Downvoted
    const canUpvote = !isUserTheOwner && vote != voteUpvoted;
    const canDownvote = !isUserTheOwner && vote != voteDownvoted;   
        
    return (
        <li key={post.ID}>                        
            <div><UserInfo name={post.UserName} logo={post.UserLogo}/>Posted: {post.CreatedDateTime}</div>
            <textarea id={"posttext_" + post.ID} title="post" placeholder="placeholder" rows={3} cols={100} disabled={!editState.active}>{postText}</textarea>                
            <div>                                        
                    <button type="button" disabled={!canUpvote}  onClick={() => handleUpvoteClick()}>Up</button>
                    <button type="button" disabled={!canDownvote} onClick={() => handleDownvoteClick()}>Down</button>
                    {!isUserTheOwner && <button type="button" onClick={() => handleReplyClick()}>Reply</button> }
                    {isUserTheOwner && <button type="button" onClick={(e) => handleEditClick(e)}>{editState.buttonText}</button> }
                    {isUserTheOwner && editState.active && <button type="button" onClick={(e) => handleCancelEditClick(e)}>Cancel</button> }
                    {isUserTheOwner && <button type="button" onClick={() => handleDeleteClick()}>Delete</button> }
            </div>
        </li>
    )
}

export default Post