import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
import GroupInfo from "./GroupInfo";
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import { IAdvert, IGroup, getGroupsServiceType, getRandomAdvertsServiceType } from "../Interfaces";
import getUserInfo from "../userInfo";
import useFindDelay from "../useFindDelay";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [find, setFind] = useState<string>("");
    const { findInternal, setFindInternal } = useFindDelay(setFind, 1000);
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);
    const getGroupsService = useInject2<getGroupsServiceType>('getGroupsService');    
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');    

    useEffect(() => {
        const fetchAllGroups = async () => {            
            const data = await getGroupsService(find)            
            setGroups(data);            
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

         // Get adverts
         const fetchRandomAdverts = async () => {                        
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);   
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }
        
        activeQueries.current = 2;
        setIsLoading(true);
        fetchAllGroups()
        fetchRandomAdverts();    
    }, [find]);

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
    
    return (
        <>           
            <LoginCheck/> 
            <div>Groups</div>            
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }            
            <label htmlFor={"groupfind"}>Search:</label><input type="text" id={"groupfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />   
            {groups.map(group => (                     
                <GroupInfo group={group}/>         
            ))}            
        </>
    )
}

export default Groups