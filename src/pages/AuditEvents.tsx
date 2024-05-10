import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert";
import AuditEvent from "./AuditEvent";
import appConfig  from "../appConfig";
import getUserInfo from '../userInfo';
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import { IAdvert, IAuditEvent, getRandomAdvertsServiceType, getAuditByHoursServiceType } from "../Interfaces";

// Audit Event information
// Params: None
const AuditEvents = () => {
    const userInfo = getUserInfo(); 
    const [auditEvents, setAuditEvents] = useState<IAuditEvent[]>([]);
    const [adverts, setAdverts] = useState<IAdvert[]>([])   
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);

    const getAuditByHoursService = useInject2<getAuditByHoursServiceType>('getAuditByHoursService');  
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');

    useEffect(() => {        
        setIsLoading(true);
        const fetchAuditEvents = async () => {                        
            const data = await getAuditByHoursService(24, 1000000, 1)                        
            setAuditEvents(data);
            console.log(data);            
            setIsLoading(false);
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);
            setIsLoading(false);         
        }

        fetchAuditEvents();
        fetchRandomAdverts();
    }, []);

    //<ul style={ { listStyleType: "none" } }>
    //            {auditEvents.map(auditEvent => (<AuditEvent auditEvent={auditEvent}/>))}                                            
    //        </ul>        

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
    
    return (
        <>
            <LoginCheck/>
            <div>Audit Events</div>                                    
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
            <table>
                <thead>
                    <tr>
                        <th>ID</th>                        
                        <th>Time</th>
                        <th>Event</th>
                        <th>User</th>
                        <th>Data</th>                        
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