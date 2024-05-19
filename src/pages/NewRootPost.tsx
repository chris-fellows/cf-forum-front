import { useState, useEffect } from "react"
import { useInject2 } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { INewRootPost } from "../Interfaces";
import getUserInfo from "../userInfo";
import { addRootPostServiceType } from "../Interfaces";

// New root post
// Params: None
const NewRootPost = () => {    
    const userInfo = getUserInfo();
    const [postText, setPostText] = useState<string>("");
    const addRootPostService = useInject2<addRootPostServiceType>('addRootPostService');

    const [searchParams] = useSearchParams();        
    const groupId = searchParams.get("groupid")!;

    const navigate = useNavigate()

    // Updates post
    const addPost = async(post : INewRootPost) => {           
        // Add root post
        const result = await addRootPostService(post);            

        // Navigate to thread posts (Will show this post)    
        navigate("/threadposts?postid=" + result[0].ID + "&groupid=" + result[0].GroupID);
    };

    // Handle save click
    const handleSaveClick = async () => {                          
        if (postText.length > 0) {
            await addPost({ groupId: groupId,
                     userId: userInfo.userId,
                     text: postText,                     
                    });                     
        } else {
            window.alert("Cannot save post with no text");
        }         
    }

    return (
        <>
        <div>New Thread</div>
        <textarea id={"newrootpost"} title="post" placeholder="New thread" rows={3} cols={100} disabled={false} onChange={(e) => setPostText(e.target.value)}></textarea>
        <button type="button" onClick={() => handleSaveClick()}>Save</button>
       </>
    )
}

export default NewRootPost