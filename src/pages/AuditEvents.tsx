import { useState, useEffect, useRef } from "react"
import { useSearchParams } from 'react-router-dom';
import { useInject2 } from "../useInject";
import AuditEvent from "./AuditEvent";
import DownloadItemsCSV from "./DownloadItemsCSV";
import getUserInfo from '../userInfo';
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import { IAuditEvent } from "../Interfaces";
import { IAuditEventsService } from "../serviceInterfaces";
import appConfig from "../appConfig";

// Audit Event information
// Params: None
const AuditEvents = ( {userId} : any) => {
    const userInfo = getUserInfo(); 
    const [auditEvents, setAuditEvents] = useState<IAuditEvent[]>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);
    const auditEventsService = useInject2<IAuditEventsService>('auditEventsService');          

     // Get user (Either passed user or query string, anything else means all users)
     const [searchParams] = useSearchParams();
     let theUserId = userId;   // Default to passed value
     if (theUserId == undefined) {   // Check query string        
         theUserId = searchParams.get("userid")!;        
    }    

    useEffect(() => {                
        const fetchAuditEvents = async () => {                        
            if (theUserId == undefined)   // Get events for all users
            {                
                const data = await auditEventsService.GetAuditByHoursService(24, 1000000, 1)                        
                setAuditEvents(data);            
            } else {    // Get events for specific user                
                const data = await auditEventsService.GetAuditByUserService(theUserId, 1000000, 1)
                setAuditEvents(data);            
            }
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

        activeQueries.current = 1;
        setIsLoading(true);
        fetchAuditEvents();        
    }, []);
    
    /*
    const downloadTestFile = () => {
        // text content
        const texts = ["line 1", "line 2", "line 3"]
    // file object
        const file = new Blob(texts, {type: 'text/plain'});
    // anchor link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "100ideas-" + Date.now() + ".txt";
    // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    */

    // Set function for export CSV
    const getCSVLine = (auditEvent : IAuditEvent, delimiter : string) : string => {
        const line = `${auditEvent.ID}${delimiter}${auditEvent.UserName}${delimiter}${auditEvent.CreatedDateTime}${delimiter}${auditEvent.EventTypeName}\n`;
        return line;
    };
     
    return (
        <>
            <LoginCheck/>
            <div>Audit Events</div>                                                          
            <LoaderOverlay loading={isLoading} message="Loading audit events..." />            
            <DownloadItemsCSV title="Download" 
                        columns={["ID", "User_Name", "Created", "Event_Type"]}
                        items={auditEvents} 
                        file= { "Audit Events" + appConfig.downloadCSVExtension } 
                        delimiter={appConfig.downloadCSVDelimiter} 
                        getLine={getCSVLine} />
            <table className="AuditEventTable">
                <thead>
                    <tr>
                        <th className="AuditEventTableCell">ID</th>                        
                        <th className="AuditEventTableCell">Time</th>
                        <th className="AuditEventTableCell">Event</th>
                        <th className="AuditEventTableCell">User</th>
                        <th className="AuditEventTableCell">Data</th>                        
                    </tr>
                </thead>
                <tbody>
                    {auditEvents.map(auditEvent => 
                        <AuditEvent auditEvent={auditEvent}/>
                    )}            
                </tbody>
            </table>            
        </>
    )
}

export default AuditEvents