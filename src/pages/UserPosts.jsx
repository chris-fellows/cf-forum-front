import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection.js";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./UserInfo.jsx"
import Advert from "./Advert.jsx"
import Post from "./Post.jsx"

// Displays user posts
// Params: UserId
const UserPosts = ({userId}) => {
    const [posts, setPosts] = useState([])
    const [adverts, setAdverts] = useState([])
    const [pageNumber, setPageNumber] = useState(1);    
    const getPostsByUserService = useInject('getPostsByUserService');
    const getRandomAdvertsService = useInject('getRandomAdvertsService');

    console.log("Entered UserPosts");
    console.log(Parse.User.Current);

    useEffect(() => {
        console.log("Entered UserPosts:" + userId);

        // Get root posts
        const fetchUserPosts = async () => {            
            const data = await getPostsByUserService(userId, 100, pageNumber) // pageSize, pageNumber            
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
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            {posts.map(post => <Post post={post}/>)}            
        </>
    )          
}

export default UserPosts