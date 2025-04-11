import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject2 } from "../useInject";
import Advert from "./Advert"
//import Pagination from "./Pagination";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import Post from "./Post"
import NewPost from "./NewPost";
import getUserInfo from '../userInfo';
import { IAdvert, IGroup, INewPostProps, IPost } from "../Interfaces";
import { IAdvertsService } from "../serviceInterfaces";
import { IGroupsService } from "../serviceInterfaces";
import { IPostsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
//import usePagination from "../pagination";

// Displays posts for thread. Root post first then every other post
// Params: PostId (Root post)
const ThreadPosts = () => {
    const userInfo = getUserInfo();     
    const [posts, setPosts] = useState<IPost[]>([]);
    const [groups, setGroups] = useState<IGroup[]>();
    const [adverts, setAdverts] = useState<IAdvert[]>([])    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);  

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);

    const groupsService = useInject2<IGroupsService>('groupsService');
    const postsService = useInject2<IPostsService>('postsService');  
    const advertsService = useInject2<IAdvertsService>('advertsService');

    const [searchParams] = useSearchParams();    
    const postId = searchParams.get("postid")!
    const groupId = searchParams.get("groupid")!;

    useEffect(() => {   
        const fetchGroup = async () => {
            const data = await groupsService.GetGroup(groupId);                                    
            setGroups(data);
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }
        
        const fetchPosts = async () => {                        
            const data = await postsService.GetPostsByRootPost(postId, 1000000, 1)                        
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

        if (adverts == null || adverts.length == 0) { activeQueries.current = 3 } else { activeQueries.current = 2};        
        setIsLoading(true);
        fetchGroup();
        fetchPosts()
        if (adverts == null || adverts.length == 0)  {
            fetchRandomAdverts();
        }
    }, []);  

    // Set function for export CSV
    const getCSVLine = (post : IPost, delimiter : string) : string => {
        const line = `${post.ID}${delimiter}${post.GroupID}${delimiter}${post.CreatedDateTime}${delimiter}${post.UserName}${delimiter}${post.Text}\n`;
        return line;
    };

    /*
    <>      
    <div>Thread Posts</div> 
    {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
    {posts.map(post => (<Post post={post}/>))}            

    <NewPost groupId={groupId!} userId={userInfo.userId!} rootPostId={postId!} parentPostId={postId!}/>
    </>
    */

    /*
    <>      
    <div>Thread Posts</div> 
    {adverts && adverts.length && <Advert advert={adverts[0]}/> }             
    {pagePosts.map(post => (<Post post={post}/>))}

    {<Pagination
        items={posts}
        pageSize={pageSize}
        setPageItems={setPagePosts} /> }
    </>
    */

    // TODO: Change so that user can post for any other post, not just root post
    // <NewPost groupId={groupId} userId={userInfo.userId} rootPostId={postId} parentPostId={postId}/>
    // const line = `${post.ID}${delimiter}${post.GroupID}${delimiter}${post.CreatedDateTime}${delimiter}${post.UserName}${delimiter}${post.Text}\n`;
    return (
        <>      
            <LoginCheck/>
            <div>Thread Posts</div>             
            <LoaderOverlay loading={isLoading} message="Loading posts..." />
            { groups && groups.length && <div>{groups[0].Name}</div> }
            <DownloadItemsCSV title="Download" 
                    columns={["ID", "Group_ID", "Created", "User_Name", "Text"]}
                    items={posts} 
                    file= { "Thread Posts" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter} 
                    getLine={getCSVLine} />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
            <ul style={ { listStyleType: "none" } }>
                {posts.map(post => (<Post post={post}/>))}            
                
                <NewPost groupId={groupId!} userId={userInfo.userId!} rootPostId={postId!} parentPostId={postId!}/>
            </ul>        
       </>
    )
}

export default ThreadPosts