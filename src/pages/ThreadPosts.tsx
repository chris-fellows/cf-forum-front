import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
//import Pagination from "./Pagination";
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import Post from "./Post"
import NewPost from "./NewPost";
import getUserInfo from '../userInfo';
import { IAdvert, INewPostProps, IPost, getPostsByRootPostServiceType, getRandomAdvertsServiceType } from "../Interfaces";
//import usePagination from "../pagination";

// Displays posts for thread. Root post first then every other post
// Params: PostId (Root post)
const ThreadPosts = () => {
    const userInfo = getUserInfo(); 
    const [posts, setPosts] = useState<IPost[]>([]);
    const [adverts, setAdverts] = useState<IAdvert[]>([])    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);  

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);

    const getPostsByRootPostService = useInject2<getPostsByRootPostServiceType>('getPostsByRootPostService');  
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');

    const [searchParams] = useSearchParams();    
    const postId = searchParams.get("postid")!
    const groupId = searchParams.get("groupid")!;

    useEffect(() => {                 
        const fetchPosts = async () => {                        
            const data = await getPostsByRootPostService(postId, 1000000, 1)                        
            setPosts(data);                        
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

        activeQueries.current = 2;
        setIsLoading(true);
        fetchPosts();
        fetchRandomAdverts();
    }, []);

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

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }

    // TODO: Change so that user can post for any other post, not just root post
    // <NewPost groupId={groupId} userId={userInfo.userId} rootPostId={postId} parentPostId={postId}/>
    return (
        <>      
            <LoginCheck/>
            <div>Thread Posts</div> 
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
            <ul style={ { listStyleType: "none" } }>
                {posts.map(post => (<Post post={post}/>))}            
                
                <NewPost groupId={groupId!} userId={userInfo.userId!} rootPostId={postId!} parentPostId={postId!}/>
            </ul>        
       </>
    )
}

export default ThreadPosts