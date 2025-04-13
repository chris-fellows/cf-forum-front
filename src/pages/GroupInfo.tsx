import { useState, useEffect } from "react"
import { useInject2 } from "../useInject";
import { Link } from "react-router-dom";
import { IGroup, IGroupTag } from "../Interfaces";
import { IGroupsService } from "../serviceInterfaces";
import Tag from "./Tag";

interface IGroupInfoProps {
    group: IGroup
    groupTags: IGroupTag[]
}

// Display group info (Basic info)
// Params: GroupId
const GroupInfo = ({group, groupTags} : IGroupInfoProps) => {       
    //const [groupTags, setGroupTags] = useState<IGroupTag[]>([]);
    const groupsService = useInject2<IGroupsService>('groupsService');

    /*
    useEffect(() => {           
        // Get group tags 
        const fetchGroupTags = async () => {
            console.log("Getting group tags");
            const data = await groupsService.GetGroupTags(group.ID)
            setGroupTags(data);
            console.log(data);            
        }
        
        //setIsLoading(true);        
        fetchGroupTags();        
    }, []);
    */

    //<td className="GroupsTableCell"><button onClick={() => handleGroupClick(group.ID)}>View Posts</button></td>
    return (        
        <>            
            <tr key={group.ID}>
                <td className="GroupsTableCell"><img src={group.Logo} alt="Logo" width={50} height={50} /></td>
                <td className="GroupsTableCell">{group.Name}</td>
                <td className="GroupsTableCell">{group.Description}</td>     
                <td className="GroupsTableCell">
                    {groupTags && groupTags.map(groupTag =>
                        <Tag name={ groupTag.TagName } logo="" />
                    )}
                </td>
                <td className="GroupsTableCell"><Link to={"/grouprootposts?groupid=" + group.ID}>Threads</Link></td> 
                <td className="GroupsTableCell"><Link to={"/addrootpost?groupid=" + group.ID}>New thread</Link></td> 
            </tr>
        </>
    )    
}

export default GroupInfo