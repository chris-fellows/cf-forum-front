import { useState, useEffect, useRef } from "react"
import { useInject2 } from "../useInject";
import Advert from "./Advert"
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import RootPost from "./RootPost";
import SearchBar from "./SearchBar";
import { useSearchParams } from 'react-router-dom';
import { IAdvert, IGroupTag, IPost } from "../Interfaces";
import { IAdvertsService, IGroupsService } from "../serviceInterfaces";
import { IRootPostsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import Tag from "./Tag";

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    //const { token } = useToken();
    const [posts, setPosts] = useState<IPost[]>([]);   
    const [groupTags, setGroupTags] = useState<IGroupTag[]>([]);
    const [find, setFind] = useState<string>("");
    const [adverts, setAdverts] = useState<IAdvert[]>([]);    
    const [pageNumber, setPageNumber] = useState<number>(1);    
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);

    const groupsService = useInject2<IGroupsService>('groupsService');
    const rootPostsService = useInject2<IRootPostsService>('rootPostsService');  
    const advertsService = useInject2<IAdvertsService>('advertsService');

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid")!;

    useEffect(() => {    
        // Get root posts
        const fetchRootPosts = async () => {        
            console.log("Getting root posts with find " + find);
            const data = await rootPostsService.GetRootPostsByGroupService(groupId, find, 10000000, pageNumber) // pageSize, pageNumber            
            setPosts(data);
            console.log(data);   
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);         
        }

        // Get group tags 
        const fetchGroupTags = async () => {
            console.log("Getting group tags");
            const data = await groupsService.GetGroupTags(groupId)
            setGroupTags(data);
            console.log(data);
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
        fetchRootPosts();
        fetchGroupTags();
        if (adverts == null || adverts.length == 0)  {
            fetchRandomAdverts();
        }
    }, [find]);

    // Set function for export CSV
    const getCSVLine = (post : IPost, delimiter : string) : string => {
        const line = `${post.ID}${delimiter}${post.GroupID}${delimiter}${post.CreatedDateTime}${delimiter}${post.UserName}${delimiter}${post.Text}\n`;
        return line;
    };


    /*
    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
    */

    // Display root post (Summary)        
    return (
        <>          
            <LoginCheck/> 
            <div>Threads</div>
            <LoaderOverlay loading={isLoading} message="Loading posts..." />           
            <SearchBar setFind={setFind} delay={appConfig.searchDelay} />
            <DownloadItemsCSV title="Download" 
                    columns={["ID", "Group_ID", "Created", "User_Name", "Text"]}
                    items={posts} 
                    file= { "Root Posts" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter} 
                    getLine={getCSVLine} />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }                        

            {groupTags && groupTags.map(groupTag =>
                <Tag name={ groupTag.TagName } logo="" />
            )}

            <table className="RootPostsTable">
                <thead>
                    <tr>
                        <th className="RootPostsTableCell">User</th>
                        <th className="RootPostsTableCell">Created</th>
                        <th className="RootPostsTableCell">Post</th>                                                
                        <th className="RootPostsTableCell"></th>                        
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => <RootPost post={post}/>)}                
                </tbody>
            </table>
        </>
    )          
}

export default GroupRootPosts