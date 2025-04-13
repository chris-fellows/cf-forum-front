import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject2 } from "../useInject";
import LoaderOverlay from "./LoaderOverlay";
import { IContentSummary } from "../Interfaces";
import { IContentsService } from "../serviceInterfaces";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoginCheck from "./LoginCheck";
import appConfig from "../appConfig";
import { Link } from "react-router-dom";

// Users information
// Params: None
const Contents = () => {
    const [contentSummaries, setContentSummaries] = useState<IContentSummary[]>([])            
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);
    const contentsService = useInject2<IContentsService>('contentsService');      

    const navigate = useNavigate()

    useEffect(() => {        
        const fetchContentSummaries = async () => {            
            const data = await contentsService.GetContentSummaries();
            setContentSummaries(data);
            activeQueries.current--;            
            if (activeQueries.current == 0) setIsLoading(false);            
        }
        
        activeQueries.current = 1;        
        setIsLoading(true);
        fetchContentSummaries();        
    }, []);  
    
    // Set function for export CSV
    const getCSVLine = (contentSummary : IContentSummary, delimiter : string) : string => {
        const line = `${contentSummary.ID}${delimiter}${contentSummary.Name}\n`;
        return line;
    };
            
    // <label htmlFor={"userfind"}>Search:</label><input type="text" id={"userfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />            
    return (
        <>
            <LoginCheck/>
            <div>Manage Contents</div>             
            <LoaderOverlay loading={isLoading} message="Loading contents..."/>                       
            <DownloadItemsCSV title="Download"
                    columns={["ID", "Name", "Code"]} 
                    items={contentSummaries} 
                    file= { "Contents" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                    getLine={getCSVLine} />
            <table className="ContentsTable">
                <thead>
                    <tr>
                        <th className="ContentsTableCell">Name</th>
                        <th className="ContentsTableCell"></th>                                   
                    </tr>
                </thead>
                <tbody>
                    {contentSummaries.map(contentSummary => 
                        <tr key={contentSummary.ID}>                                                        
                            <td className="ContentsTableCell">{contentSummary.Name}</td>   
                            <td className="ContentsTableCell"><Link to={"/contentedit?contentid=" + contentSummary.ID }>Edit</Link></td>                          
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Contents