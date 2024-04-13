import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
//import { useNavigate } from "react-router-dom";
import Advert from "./Advert.jsx"
import Post from "./Post.jsx"
import RootPost from "./RootPost.jsx";
import { useSearchParams } from 'react-router-dom';

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    const [posts, setPosts] = useState([])
    const [adverts, setAdverts] = useState([])
    const [pageNumber, setPageNumber] = useState(1);    
    const getRootPostsByGroupService = useInject('getRootPostsByGroupService');  
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid");

    useEffect(() => {
        console.log("Entered GroupRootPosts:" + groupId);

        // Get root posts
        const fetchRootPosts = async () => {            
            const data = await getRootPostsByGroupService(groupId, 1000, pageNumber) // pageSize, pageNumber            
            setPosts(data);
            console.log(data);            
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }

        fetchRootPosts();
        fetchRandomAdverts();
    }, []);
    
    // Display root post (Summary)
    // {posts.map(post => <div key={post.ID} class="Post">{post.ID} {post.Text}</div>)}
    //  {adverts && <Advert advert={adverts[0]}/> }
    return (
        <>           
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            {posts.map(post => <RootPost post={post}/>)}            
        </>
    )          
}

export default GroupRootPosts