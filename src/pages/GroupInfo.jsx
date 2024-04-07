import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";

// Display group info (Basic info)
// Params: GroupId
const GroupInfo = ({group}) => {
    //const [group, setGroup] = useState([])        
    //const getGroupService = useInject('getGroupService');

    //const navigate = useNavigate()

    // TODO: Load group info
    const handleGroupClick = async (groupId) => { 
        //e.preventDefault();
        //navigate("/Group?id=" + groupId);
    }

    // <img src={group.Log} alt="Logo" />
    return (        
        <>
        <div>GroupInfo</div>
        <div key={group.ID} className="Group" >
                <p>Name: {group.name}</p>
                <p>Description: {group.Description}</p>                
                <button onClick={() => handleGroupClick(group.ID)}>Edit</button>
            </div>            
        </>
    )    
}

export default GroupInfo