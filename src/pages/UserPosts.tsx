import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { useSearchParams } from 'react-router-dom';
import Advert from "./Advert"
import LoaderOverlay from "./LoaderOverlay";
import LoginCheck from "./LoginCheck";
import UserPost from "./UserPost"
import getUserInfo from '../userInfo';
import { IAdvert, IPost, getPostsByUserServiceType, getRandomAdvertsServiceType } from '../Interfaces';

// Displays user posts
// Params: UserId
const UserPosts = ({ userId } : any) => {    
    const userInfo = getUserInfo();
    const [posts, setPosts] = useState<IPost[]>([])
    const [adverts, setAdverts] = useState<IAdvert[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);    
    //const [pageNumber, setPageNumber] = useState<number>(1);    
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
        // Get root posts
        const fetchUserPosts = async () => {                        
            const data = await getPostsByUserService(theUserId, 10000000, 1) // pageSize, pageNumber                        
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

        if (adverts == null || adverts.length == 0) { activeQueries.current = 2 } else { activeQueries.current = 1};        
        setIsLoading(true);
        fetchUserPosts()
        if (adverts == null || adverts.length == 0)  {
            fetchRandomAdverts();
        }
    }, []);  
   
    return (
        <>      
            <LoginCheck/>
            <div>My Posts</div>
            <LoaderOverlay loading={isLoading} message="Loading posts..." />
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }

            <ul style={ { listStyleType: "none" } }>
                {posts && posts.map(post => <UserPost post={post}/>)}            
            </ul>
        </>
    )          
}

export default UserPosts