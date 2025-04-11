import { useState, useEffect, useRef } from "react"
import { useInject2 } from "../useInject";
import { useSearchParams } from 'react-router-dom';
import Advert from "./Advert"
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import UserPost from "./UserPost"
import getUserInfo from '../userInfo';
import { IAdvert, IPost } from '../Interfaces';
import { IAdvertsService } from "../serviceInterfaces";
import { IPostsService } from "../serviceInterfaces";
import appConfig from "../appConfig";

// Displays user posts
// Params: UserId
const UserPosts = ({ userId } : any) => {    
    const userInfo = getUserInfo();
    const [posts, setPosts] = useState<IPost[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);    
    //const [pageNumber, setPageNumber] = useState<number>(1);    
    const postsService = useInject2<IPostsService>('postsService');
    const advertsService = useInject2<IAdvertsService>('advertsService');    

    // Get user (Either passed userId, from querystring or default)    
    const [searchParams] = useSearchParams();
    let theUserId = userId;   // Default to passed value
    if (theUserId == undefined) {   // Check query string        
        theUserId = searchParams.get("userid")!;           
        if (theUserId == undefined) {    // Current user            
            theUserId = userInfo.userId;
        }
    }

    useEffect(() => {        
        // Get root posts
        const fetchUserPosts = async () => {                        
            const data = await postsService.GetPostsByUser(theUserId, 10000000, 1) // pageSize, pageNumber                        
            setPosts(data);   
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

        if (adverts == null || adverts.length == 0) { activeQueries.current = 2 } else { activeQueries.current = 1};        
        setIsLoading(true);
        fetchUserPosts()
        if (adverts == null || adverts.length == 0)  {
            fetchRandomAdverts();
        }
    }, []); 
    
    // Set function for export CSV
    const getCSVLine = (post : IPost, delimiter : string) : string => {
        const line = `${post.ID}${delimiter}${post.GroupID}${delimiter}${post.CreatedDateTime}${delimiter}${post.UserName}${delimiter}${post.Text}\n`;
        return line;
    };
   
    return (
        <>      
            <LoginCheck/>
            <div>My Posts</div>
            <LoaderOverlay loading={isLoading} message="Loading posts..." />
            <DownloadItemsCSV title="Download" 
                        columns={["ID", "Group_ID", "Created", "User_Name", "Text"]}
                        items={posts} 
                        file= { "User Posts" + appConfig.downloadCSVExtension }
                        delimiter={appConfig.downloadCSVDelimiter} 
                        getLine={getCSVLine} />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }

            <ul style={ { listStyleType: "none" } }>
                {posts && posts.map(post => <UserPost post={post}/>)}            
            </ul>
        </>
    )          
}

export default UserPosts