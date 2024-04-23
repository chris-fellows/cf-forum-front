import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject } from "../DependencyInjection";
import Advert from "./Advert.jsx"
import Post from "./Post.jsx"

// Displays posts for thread. Root post first then every other post
// Params: PostId (Root post)
const ThreadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [adverts, setAdverts] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const getPostsByRootPostService = useInject('getPostsByRootPostService');  
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    const [searchParams] = useSearchParams();
    //const groupId = searchParams.get("groupid");
    const postId = searchParams.get("postid");

    console.log("ThreadPosts:" + postId);

    useEffect(() => {        
        // TODO: Implement paging        
        const fetchPosts = async () => {            
            const data = await getPostsByRootPostService(postId, 100, pageNumber)            
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

    //    PostID: post.ID,
    //    UserID: post.UserID,
    //    Vote: 0,     // 0: No vote, 1: Upvoted, 2: Downvoted
    //    Track: 0     // 0: Not tracked, 1: Tracked
    //};
        
    return (
        <>      
            <div>Thread Posts</div> 
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
            {posts.map(post => (<Post post={post}/>))}
        </>
    )
}

export default ThreadPosts