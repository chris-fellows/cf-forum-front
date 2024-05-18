import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import Advert from "./Advert"
import Loading from "./Loading";
import LoginCheck from "./LoginCheck";
import RootPost from "./RootPost";
import getUserInfo from '../userInfo';
import { useSearchParams } from 'react-router-dom';
import { IAdvert, IPost, getRootPostsByGroupServiceType, getRandomAdvertsServiceType } from "../Interfaces";
import useFindDelay from "../useFindDelay";

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    //const { token } = useToken();
    const [posts, setPosts] = useState<IPost[]>([]);   
    const [find, setFind] = useState<string>("");
    const { findInternal, setFindInternal } = useFindDelay(setFind, 1000);    
    const [adverts, setAdverts] = useState<IAdvert[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);    
    const [isLoading, setIsLoading] = useState<boolean>(true);     
    const activeQueries = useRef<number>(0);

    const getRootPostsByGroupService = useInject2<getRootPostsByGroupServiceType>('getRootPostsByGroupService');  
    const getRandomAdvertsService = useInject2<getRandomAdvertsServiceType>('getRandomAdvertsService');

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid")!;

    useEffect(() => {
        console.log("Use effect");

        // Get root posts
        const fetchRootPosts = async () => {        
            console.log("Getting root posts with find " + find);
            const data = await getRootPostsByGroupService(groupId, find, 10000000, pageNumber) // pageSize, pageNumber            
            setPosts(data);
            console.log(data);   
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

        activeQueries.current = 2;
        setIsLoading(true);     
        fetchRootPosts();
        fetchRandomAdverts();
    }, [find]);

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }

    // Display root post (Summary)        
    return (
        <>          
            <LoginCheck/> 
            <div>Group Posts</div>
            {adverts && adverts.length && <Advert advert={adverts[0]}/> }            
            <label htmlFor={"postfind"}>Search:</label><input type="text" id={"postfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />   
            <ul style={ { listStyleType: "none" } }>
                {posts.map(post => <RootPost post={post}/>)}            
            </ul>
        </>
    )          
}

export default GroupRootPosts