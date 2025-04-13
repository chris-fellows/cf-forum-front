import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject2 } from "../useInject";
import LoaderOverlay from "./LoaderOverlay";
import { ITag } from "../Interfaces";
import { ITagsService } from "../serviceInterfaces";
import Tag from "./Tag";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoginCheck from "./LoginCheck";
import appConfig from "../appConfig";

// Tags information
// Params: None
const Tags = () => {
    const [tags, setTags] = useState<ITag[]>([])            
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);
    const tagsService = useInject2<ITagsService>('tagsService');      

    const navigate = useNavigate()

    useEffect(() => {        
        const fetchTags = async () => {            
            const data = await tagsService.GetTags();
            setTags(data);
            activeQueries.current--;            
            if (activeQueries.current == 0) setIsLoading(false);            
        }
        
        activeQueries.current = 1;        
        setIsLoading(true);
        fetchTags();        
    }, []);  
    
    // Set function for export CSV
    const getCSVLine = (tag : ITag, delimiter : string) : string => {
        const line = `${tag.ID}${delimiter}${tag.Name}\n`;
        return line;
    };
            
    // <label htmlFor={"userfind"}>Search:</label><input type="text" id={"userfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />            
    return (
        <>
            <LoginCheck/>
            <div>Manage Tags</div>             
            <LoaderOverlay loading={isLoading} message="Loading tags..."/>                       
            <DownloadItemsCSV title="Download"
                    columns={["ID", "Name"]} 
                    items={tags} 
                    file= { "Tags" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                    getLine={getCSVLine} />
            <table className="TagsTable">
                <thead>
                    <tr>
                        <th className="TagsTableCell">Name</th>                        
                    </tr>
                </thead>
                <tbody>
                    {tags.map(tag => 
                        <tr key={tag.ID}>                            
                            <td className="TagsTableCell"><Tag name={tag.Name} logo={""} /></td>                                                        
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Tags