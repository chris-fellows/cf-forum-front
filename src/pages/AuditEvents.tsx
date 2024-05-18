import { useState, useEffect, useRef } from "react"
import { useSearchParams } from 'react-router-dom';
import { useInject, useInject2 } from "../DependencyInjection";
import AuditEvent from "./AuditEvent";
import getUserInfo from '../userInfo';
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import { IAuditEvent, getAuditByHoursServiceType, getAuditByUserServiceType } from "../Interfaces";

// Audit Event information
// Params: None
const AuditEvents = ( {userId} : any) => {
    const userInfo = getUserInfo(); 
    const [auditEvents, setAuditEvents] = useState<IAuditEvent[]>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);
    const getAuditByHoursService = useInject2<getAuditByHoursServiceType>('getAuditByHoursService');      
    const getAuditByUserService = useInject2<getAuditByUserServiceType>('getAuditByUserService');      

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
                const data = await getAuditByHoursService(24, 1000000, 1)                        
                setAuditEvents(data);            
            } else {    // Get events for specific user                
                const data = await getAuditByUserService(theUserId, 1000000, 1)
                setAuditEvents(data);            
            }
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

        activeQueries.current = 1;
        setIsLoading(true);
        fetchAuditEvents();        
    }, []);   
 
    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
    
    return (
        <>
            <LoginCheck/>
            <div>Audit Events</div>                                                
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