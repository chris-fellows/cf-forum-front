import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject } from "../DependencyInjection";
import Advert from "./Advert"
import Post from "./Post"
import NewPost from "./NewPost";
import getUserInfo from '../userInfo';
import { IAdvert, INewPostProps, IPost } from "../Interfaces";

// Displays posts for thread. Root post first then every other post
// Params: PostId (Root post)
const ThreadPosts = () => {
    const userInfo = getUserInfo(); 
    const [posts, setPosts] = useState<IPost[]>([]);
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1);
    const getPostsByRootPostService = useInject('getPostsByRootPostService');  
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    const [searchParams] = useSearchParams();    
    const postId = searchParams.get("postid");
    const groupId = searchParams.get("groupid");

    //console.log("ThreadPosts:PostID=" + postId + "; GroupID=" + groupId);

    useEffect(() => {         
        // TODO: Implement paging        
        const fetchPosts = async () => {                        
            const data = await getPostsByRootPostService(postId, 1000, pageNumber)                        
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