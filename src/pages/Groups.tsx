import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
//import fetch from 'fetch';
import Advert from "./Advert"
import GroupInfo from "./GroupInfo";
import { IAdvert, IGroup, getGroupsServiceType, getRandomAdvertsServiceType } from "../Interfaces";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [errorMessage, setErrorMessage] = useState<any>([])
    const [debugMessage, setDebugMessage] = useState<string>("No debug message")
    const getGroupsService = useInject2<getGroupsServiceType>('getGroupsService');    
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');    

    //const navigate = useNavigate()

    useEffect(() => {
        console.log("Entered Groups:useEffect");

        /*
        const fetchAllGroups = () => {
            try{
                console.log("Fetching groups 100");
                fetch("http://localhost:8800/groups")
                    .then((response) => response.json())
                    .then((data) => setGroups(data))
                    .catch((error2) => setErrorMessage("Error getting groups:" + error2));

                console.log("Fetching groups 200");
                console.log(groups);
                                                
            } catch (error) {
                console.log("Fetched groups response: Error");
                console.log(error);
            }
        }
        */

        /*
        const fetchAllGroups2 = () => {        
            console.log("calling getGroupsService");
            //const groupList = getGroupsService();
            fetch("http://localhost:8800/groups")
                .then((response) => {
                    console.log("Got response 100")
                    return response.json()
                })
                .then((data) => {
                    //setDebugMessage("Got response 200")
                    console.log("Got response 200")
                    console.log(data)
                    setGroups(data)
                })
                .catch((error2) => console.log(error2));
        }
        */

        const fetchAllGroups = async () => {            
            const data = await getGroupsService()            
            setGroups(data);            
        }

         // Get adverts
         const fetchRandomAdverts = async () => {                        
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }
        
        fetchAllGroups()
        fetchRandomAdverts();    
    }, []);
    
    return (
        <>            
            <div>Groups</div>            
            {adverts && adverts.length && <Advert  advert={adverts[0]}/> }
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