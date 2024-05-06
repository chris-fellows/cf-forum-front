import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
//import Pagination from "./Pagination";
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

    //const pageSize = 5;
    //const [pagePosts, setPagePosts] = useState<IPost[]>([]);

    const getPostsByRootPostService = useInject2<getPostsByRootPostServiceType>('getPostsByRootPostService');  
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');

    const [searchParams] = useSearchParams();    
    const postId = searchParams.get("postid")!
    const groupId = searchParams.get("groupid")!;

    //console.log("ThreadPosts:PostID=" + postId + "; GroupID=" + groupId);

    useEffect(() => {                 
        const fetchPosts = async () => {                        
            const data = await getPostsByRootPostService(postId, 1000000, 1)                        
            setPosts(data);
            console.log(data);            
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }

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

    // TODO: Change so that user can post for any other post, not just root post
    // <NewPost groupId={groupId} userId={userInfo.userId} rootPostId={postId} parentPostId={postId}/>
    return (
        <>      
            <div>Thread Posts</div> 
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }             
            {posts.map(post => (<Post post={post}/>))}            

            <NewPost groupId={groupId!} userId={userInfo.userId!} rootPostId={postId!} parentPostId={postId!}/>
       </>
    )
}

export default ThreadPosts