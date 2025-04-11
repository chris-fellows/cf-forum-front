import getUserInfo from '../userInfo';
import { useInject2 } from "../DependencyInjection";
import { useEffect, useState } from "react";
import StringAsHTML from "./StringAsHTML";
import { getContentByNameServiceType } from "../Interfaces";

interface IContentProps {
    name : string
}

// Content by name (E.g. Home Message)
// Params: None
const ContentByName = ( { name } : IContentProps) => {
    const userInfo = getUserInfo();
    const [contentData, setContentData] = useState<string>("");

    const getContentByNameService = useInject2<getContentByNameServiceType>('getContentByNameService');  

     useEffect(() => {
            const fetchContent = async (name : string) => {                                            
                const content = await getContentByNameService(name); 
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