import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";
//import fetch from 'fetch';
import GroupInfo from "./GroupInfo";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [debugMessage, setDebugMessage] = useState("No debug message")
    const getGroupsService = useInject('getGroupsService');

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

        console.log("Calling fetchAllGroups");
        fetchAllGroups3()
        console.log("Called fetchAllGroups");

        console.log("Leaving Groups:useEffect");
    }, []);

    const handleGroupClick = async (id) => { 
        //e.preventDefault();
        //navigate("/Group?id=" + id);
    }

    return (
        <>
            <div>Groups</div>
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