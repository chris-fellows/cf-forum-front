import { useState, useEffect } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
import GroupInfo from "./GroupInfo";
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import { IAdvert, IGroup, getGroupsServiceType, getRandomAdvertsServiceType } from "../Interfaces";
import getUserInfo from "../userInfo";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [errorMessage, setErrorMessage] = useState<any>([])
    const [debugMessage, setDebugMessage] = useState<string>("No debug message")
    let countActiveQueries = 0;
    const getGroupsService = useInject2<getGroupsServiceType>('getGroupsService');    
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');    

    useEffect(() => {
        const fetchAllGroups = async () => {            
            const data = await getGroupsService()            
            setGroups(data);            
            countActiveQueries--;
            if (countActiveQueries == 0) setIsLoading(false);
        }

         // Get adverts
         const fetchRandomAdverts = async () => {                        
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);   
            countActiveQueries--;
            if (countActiveQueries == 0) setIsLoading(false);
        }
        
        countActiveQueries = 2;
        setIsLoading(true);
        fetchAllGroups()
        fetchRandomAdverts();    
    }, []);

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
    
    return (
        <>           
            <LoginCheck/> 
            <div>Groups</div>            
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            <div>{errorMessage}</div>            
            <div>{debugMessage}</div>
            {groups.map(group => (                     
                <GroupInfo group={group}/>         
            ))}    
            <div>Groups end</div>
        </>
    )
}

export default Groups