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
        const pageSize = 50;        
        const fetchPosts = async () => {            
            const data = await getPostsByRootPostService(postId, pageSize, pageNumber)            
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

    // TODO: Optimise this and pass all post parameters so that the Post component doesn't have to load
    // post from backend.
    // TODO: Set isUserTheOwner
    return (
        <>       
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }     
            {posts.map(post => (<Post post={post} isUserTheOwner={true} />))}
        </>
    )
}

export default ThreadPosts