import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";

// Display group info (Basic info)
// Params: GroupId
const GroupInfo = ({group}) => {
    //const [group, setGroup] = useState([])        
    //const getGroupService = useInject('getGroupService');

    const navigate = useNavigate()

    // Handle group click, displays group root posts
    const handleGroupClick = async (groupId) => { 
        //e.preventDefault();        
        console.log("navigating to /grouprootposts");
        navigate("/grouprootposts?groupid=" + groupId);        
    }

    // <img src={group.Log} alt="Logo" />
    return (        
        <>            
            <div key={group.ID} className="Group" >
                    <p>Name: {group.name}</p>
                    <p>Description: {group.Description}</p>                
                    <img src={group.Logo} alt="Logo" />
                    <button onClick={() => handleGroupClick(group.ID)}>View Posts</button>
                </div>            
        </>
    )    
}

export default GroupInfo