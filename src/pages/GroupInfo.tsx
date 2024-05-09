import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";
import { IGroup } from "../Interfaces";

interface IGroupInfoProps {
    group: IGroup
}

// Display group info (Basic info)
// Params: GroupId
const GroupInfo = ({group} : IGroupInfoProps) => {       
    const navigate = useNavigate()

    // Handle group click, displays group root posts
    const handleGroupClick = async (groupId : string) => { 
        //e.preventDefault();        
        //console.log("navigating to /grouprootposts");
        navigate("/grouprootposts?groupid=" + groupId);        
    }
    
    return (        
        <>            
            <div key={group.ID} className="Group" >
                    <h3>{group.Name}</h3>
                    <h5>{group.Description}</h5>                
                    <img src={group.Logo} alt="Logo" />
                    <button onClick={() => handleGroupClick(group.ID)}>View Posts</button>
                </div>            
        </>
    )    
}

export default GroupInfo