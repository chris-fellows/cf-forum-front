import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import RootPost from "./RootPost";
import SearchBar from "./SearchBar";
import { useSearchParams } from 'react-router-dom';
import { IAdvert, IPost, getRootPostsByGroupServiceType, getRandomAdvertsServiceType } from "../Interfaces";
import appConfig from "../appConfig";

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    //const { token } = useToken();
    const [posts, setPosts] = useState<IPost[]>([]);   
    const [find, setFind] = useState<string>("");
    const [adverts, setAdverts] = useState<IAdvert[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);    
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);

    const getRootPostsByGroupService = useInject2<getRootPostsByGroupServiceType>('getRootPostsByGroupService');  
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid")!;

    useEffect(() => {    
        // Get root posts
        const fetchRootPosts = async () => {        
            console.log("Getting root posts with find " + find);
            const data = await getRootPostsByGroupService(groupId, find, 10000000, pageNumber) // pageSize, pageNumber            
            setPosts(data);
            console.log(data);   
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);         
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data); 
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);         
        }

        if (adverts == null || adverts.length == 0) { activeQueries.current = 2 } else { activeQueries.current = 1};        
        setIsLoading(true);
        fetchRootPosts()
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