import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";
//import fetch from 'fetch';
import Advert from "./Advert.jsx"
import GroupInfo from "./GroupInfo";


// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState([])
    const [adverts, setAdverts] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [debugMessage, setDebugMessage] = useState("No debug message")
    const getGroupsService = useInject('getGroupsService');
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    //const navigate = useNavigate()

    useEffect(() => {
        console.log("Entered Groups:useEffect");

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

        const fetchAllGroups3 = async () => {
            console.log("calling getGroupsService");
            const data = await getGroupsService()
            console.log("called getGroupsService");
            setGroups(data);
            console.log("set Groups in state");
        }

         // Get adverts
         const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }

        console.log("Calling fetchAllGroups");
        fetchAllGroups3()
        fetchRandomAdverts();
        console.log("Called fetchAllGroups");

        console.log("Leaving Groups:useEffect");
    }, []);

    //const handleGroupClick = async (id) => { 
        //e.preventDefault();
        //navigate("/Group?id=" + id);
    //}

    return (
        <>
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