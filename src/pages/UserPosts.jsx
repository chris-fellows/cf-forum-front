import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection.js";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./UserInfo.jsx"
import { useSearchParams } from 'react-router-dom';
import Advert from "./Advert.jsx"
import Post from "./Post.jsx"
import getUserInfo from '../userInfo';

// Displays user posts
// Params: UserId
const UserPosts = ({userId}) => {    
    const userInfo = getUserInfo();
    const [posts, setPosts] = useState([])
    const [adverts, setAdverts] = useState([])
    const [pageNumber, setPageNumber] = useState(1);    
    const getPostsByUserService = useInject('getPostsByUserService');
    const getRandomAdvertsService = useInject('getRandomAdvertsService');    

    // Get user (Either passed userId, from querystring or default)
    const [searchParams] = useSearchParams();
    let theUserId = userId;   // Default to passed value
    if (theUserId == undefined) {   // Check query string        
        theUserId = searchParams.get("userid");        
        if (theUserId == undefined) {    // Current user
            theUserId = userInfo.userId;
        }
    }    

    //console.log("Entered UserPosts");
    //console.log(userId);    
    //console.log("UserPosts:OtherUserId");
    //console.log(otherUserId);

    useEffect(() => {
        console.log("Entered UserPosts:" + theUserId);

        // Get root posts
        const fetchUserPosts = async () => {            
            const data = await getPostsByUserService(theUserId, 100, pageNumber) // pageSize, pageNumber            
            setPosts(data);
            console.log(data);            
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }

        fetchUserPosts();
        fetchRandomAdverts();
    }, []);  
    
    // Display root post (Summary)
    // {posts.map(post => <div key={post.ID} class="Post">{post.ID} {post.Text}</div>)}
    //  {adverts && <Advert advert={adverts[0]}/> }
    return (
        <>      
            <div>My Posts</div>
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            {posts.map(post => <Post post={post}/>)}            
        </>
    )          
}

export default UserPosts