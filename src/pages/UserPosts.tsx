import { useState, useEffect } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
//import { useNavigate } from "react-router-dom";
//import { UserInfo } from "./UserInfo"
import { useSearchParams } from 'react-router-dom';
import Advert from "./Advert"
import Post from "./Post"
import getUserInfo from '../userInfo';
import { IAdvert, IPost, getPostsByUserServiceType, getRandomAdvertsServiceType } from '../Interfaces';

// Displays user posts
// Params: UserId
const UserPosts = ({ userId } : any) => {    
    const userInfo = getUserInfo();
    const [posts, setPosts] = useState<IPost[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1);    
    const getPostsByUserService = useInject2<getPostsByUserServiceType>('getPostsByUserService');
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');    

    // Get user (Either passed userId, from querystring or default)    
    const [searchParams] = useSearchParams();
    let theUserId = userId;   // Default to passed value
    if (theUserId == undefined) {   // Check query string        
        theUserId = searchParams.get("userid")!;           
        if (theUserId == undefined) {    // Current user            
            theUserId = userInfo.userId;
        }
    }

    useEffect(() => {
        console.log("Entered UserPosts:" + theUserId);

        // Get root posts
        const fetchUserPosts = async () => {                        
            const data = await getPostsByUserService(theUserId, 10000000, pageNumber) // pageSize, pageNumber                        
            setPosts(data);            
        }

        // Get adverts
        const fetchRandomAdverts = async () => {
            const data = await getRandomAdvertsService(1)   // Get one advert            
            setAdverts(data);            
        }

        fetchUserPosts();
        fetchRandomAdverts();
    }, []);  
        
    return (
        <>      
            <div>My Posts</div>
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }
            {posts && posts.map(post => <Post post={post}/>)}            
        </>
    )          
}

export default UserPosts