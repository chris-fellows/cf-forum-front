import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
import Advert from "./Advert"
import Post from "./Post"
import RootPost from "./RootPost";
import { useSearchParams } from 'react-router-dom';
import { IAdvert, IPost } from "../Interfaces";

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    //const { token } = useToken();
    const [posts, setPosts] = useState<IPost[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1);    
    const getRootPostsByGroupService = useInject('getRootPostsByGroupService');  
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid");

    useEffect(() => {
        // Get root posts
        const fetchRootPosts = async () => {            
            const data = await getRootPostsByGroupService(groupId, 100, pageNumber) // pageSize, pageNumber            
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
    return (
        <>           
            <div>Group Posts</div>
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            {posts.map(post => <RootPost post={post}/>)}            
        </>
    )          
}

export default GroupRootPosts