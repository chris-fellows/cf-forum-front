import LoginCheck from "./LoginCheck";
import { IContent } from "../Interfaces";
import { IContentsService } from "../serviceInterfaces";
import { useState, useEffect } from "react";
import { useInject2 } from "../useInject";
import { useSearchParams } from "react-router-dom";
import getUserInfo from "../userInfo";
import StringAsHTML from "./StringAsHTML";

// Content Edit information
// Params: None
const ContentEdit = ({ contentid } : any) => {
    const userInfo = getUserInfo();
    const [content, setContent] = useState<IContent>();
    const [newContent, setNewContent] = useState<string>("");

    const contentsService = useInject2<IContentsService>('contentsService');      

    // Get user (Either passed contentid, from querystring or default)
          let contentIdSource = "param";
          const [searchParams] = useSearchParams();
          var theContentId = contentid;   // Default to passed value
          if (theContentId == undefined) {   // Check query string        
            theContentId = searchParams.get("contentid")!;        
              if (theContentId == undefined) {    // Current user
                theContentId = userInfo.userId;
                contentIdSource = "current";
              } else {
                contentIdSource = "query";
              }    
          }    

          console.log("Entered Content" + contentIdSource + ":" + theContentId);

     useEffect(() => {       
            // Get root posts
            const fetchContent = async () => {                            
                const data = await contentsService.GetContent(theContentId);
                console.log(data);
                setContent(data[0]);
                setNewContent(data[0].Data);                                        
            }
    
            fetchContent();        
        }, []);   
            
        if (!content) return <div>User</div>

    return (
        <>
            <p>Content Edit</p>
            <LoginCheck/>                           
            <textarea onChange={(value) => setNewContent(value.target.value) }>
                { newContent }
            </textarea>
            <StringAsHTML content= {newContent} />
        </>
    )
}

export default ContentEdit