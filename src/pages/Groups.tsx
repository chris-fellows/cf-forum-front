import { useState, useEffect, useRef } from "react"
import { useInject2 } from "../useInject";
import Advert from "./Advert"
import DownloadItemsCSV from "./DownloadItemsCSV";
import GroupInfo from "./GroupInfo";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import SearchBar from "./SearchBar";
import { IAdvert, IGroup, IGroupTag } from "../Interfaces";
import { IAdvertsService } from "../serviceInterfaces";
import { IGroupsService } from "../serviceInterfaces";
import appConfig from "../appConfig";

// Displays each group info
const Groups = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [groupTags, setGroupTags] = useState<IGroupTag[]>([])
    const [find, setFind] = useState<string>("");
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);
    const groupsService = useInject2<IGroupsService>('groupsService');    
    const advertsService = useInject2<IAdvertsService>('advertsService');    

    useEffect(() => {
        // Get groups
        const fetchAllGroups = async () => {            
            const data = await groupsService.GetGroups(find)            
            setGroups(data);            
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

        // Get group tags
        const fetchAllGroupTags = async () => {            
            const data = await groupsService.GetAllGroupTags()
            setGroupTags(data);            
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

         // Get adverts
         const fetchRandomAdverts = async () => {                        
            const data = await advertsService.GetRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);   
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }
        
        //if (adverts == null || adverts.length == 0) { activeQueries.current = 2 } else { activeQueries.current = 1};        
        if (adverts == null || adverts.length == 0) { activeQueries.current = 3 } else { activeQueries.current = 2};        
        setIsLoading(true);
        fetchAllGroups()
        fetchAllGroupTags()
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

  const getGroupTags = async(id : string) => {           
            
     };
 

    // Set function for export CSV
    const getCSVLine = (group : IGroup, delimiter : string) : string => {
        const line = `${group.ID}${delimiter}${group.Name}${delimiter}${group.Description}\n`;
        return line;
    };
       
    return (
        <>           
            <LoginCheck/> 
            <div>Groups</div>        
            <LoaderOverlay loading={isLoading} message="Loading groups..." />          
            <SearchBar setFind={setFind} delay={appConfig.searchDelay} /><br/>
            <DownloadItemsCSV title="Download" 
                    columns={["ID", "Name", "Description"]}
                    items={groups} 
                    file= { "Groups" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                     getLine={getCSVLine} />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }                        

            <table className="GroupsTable">
                <thead>
                    <tr>
                        <th className="GroupsTableCell"></th>
                        <th className="GroupsTableCell">Name</th>                        
                        <th className="GroupsTableCell">Description</th>   
                        <th className="GroupsTableCell">Tags</th>   
                        <th className="GroupsTableCell"></th>                        
                        <th className="GroupsTableCell"></th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map(group => (                     
                        <GroupInfo group={group} groupTags={ groupTags.filter(groupTag => groupTag.GroupID === group.ID) } />         
                    ))}              
                </tbody>
            </table>                    
        </>
    )
}

export default Groups