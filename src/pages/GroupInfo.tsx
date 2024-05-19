import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IGroup } from "../Interfaces";

interface IGroupInfoProps {
    group: IGroup
}

// Display group info (Basic info)
// Params: GroupId
const GroupInfo = ({group} : IGroupInfoProps) => {       
    //const navigate = useNavigate()

    /*
    // Handle group click, displays group root posts
    const handleGroupClick = async (groupId : string) => {         
        navigate("/grouprootposts?groupid=" + groupId);        
    }
    */

    //<td className="GroupsTableCell"><button onClick={() => handleGroupClick(group.ID)}>View Posts</button></td>
    return (        
        <>            
            <tr key={group.ID}>
                <td className="GroupsTableCell"><img src={group.Logo} alt="Logo" width={50} height={50} /></td>
                <td className="GroupsTableCell">{group.Name}</td>
                <td className="GroupsTableCell">{group.Description}</td>                                
                <td className="GroupsTableCell"><Link to={"/grouprootposts?groupid=" + group.ID}>Threads</Link></td> 
                <td className="GroupsTableCell"><Link to={"/addrootpost?groupid=" + group.ID}>New thread</Link></td> 
            </tr>
        </>
    )    
}

export default GroupInfo