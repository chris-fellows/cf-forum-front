import getUserInfo from '../userInfo';
import { useInject2 } from "../useInject";
import { useEffect, useState } from "react";
import StringAsHTML from "./StringAsHTML";
import { IContentsService } from '../serviceInterfaces';

interface IContentProps {
    name : string
}

// Content by name (E.g. Home Message)
// Params: None
const ContentByName = ( { name } : IContentProps) => {
    const userInfo = getUserInfo();
    const [contentData, setContentData] = useState<string>("");

    const contentsService = useInject2<IContentsService>('contentsService');  

     useEffect(() => {
            const fetchContent = async (name : string) => {                                            
                const content = await contentsService.GetContentByName(name); 
                if (content.length > 0)             
                {
                    setContentData(content[0].Data);
                }
            }    

            fetchContent(name);
        }, []);
    
    return (
        <>            
            { contentData && contentData.length > 0 && <StringAsHTML content={ contentData } /> }          
        </>
    )
}

export default ContentByName