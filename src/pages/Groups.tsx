import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
import GroupInfo from "./GroupInfo";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import SearchBar from "./SearchBar";
import { IAdvert, IGroup, getGroupsServiceType, getRandomAdvertsServiceType } from "../Interfaces";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [find, setFind] = useState<string>("");
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
        
        if (adverts == null || adverts.length == 0) { activeQueries.current = 2 } else { activeQueries.current = 1};        
        setIsLoading(true);
        fetchAllGroups()
        if (adverts == null || adverts.length == 0)  {
            fetchRandomAdverts();
        }
                   
        /*
        setTimeout(function(){            
            fetchAllGroups()
            if (adverts == null || adverts.length == 0) {
                fetchRandomAdverts();   
            }
        }, 3000);
        */
    }, [find]);
   
    return (
        <>           
            <LoginCheck/> 
            <div>Groups</div>        
            <LoaderOverlay loading={isLoading} message="Loading groups..." />
            <SearchBar setFind={setFind} delay={1000} />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }                        
            {groups.map(group => (                     
                <GroupInfo group={group}/>         
            ))}            
        </>
    )
}

export default Groups