import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject2 } from "../useInject";
import RootPost from "./RootPost";
import { IPost } from "../Interfaces";
import { IRootPostsService } from "../serviceInterfaces";
import getUserInfo from '../userInfo';

// Displays N most popular root posts
const PopularRootPosts = ( { maxPosts = 1 }) => {
    const userInfo = getUserInfo();     
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);  

    //const getRootPostsByPopularityService = useInject2<getRootPostsByPopularityServiceType>('getRootPostsByPopularityService');  
    const rootPostsService = useInject2<IRootPostsService>('rootPostsService');

    useEffect(() => {                  
        const fetchPosts = async () => {                        
            //const data = await getRootPostsByPopularityService("", maxPosts, 1);
            const data = await rootPostsService.GetRootPostsByPopularity("", maxPosts, 1);
            setPosts(data);                        
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

        setIsLoading(true);        
        fetchPosts()        
    }, []);  

    return (
        <>
         <table className="RootPostsTable">
                <thead>
                    <tr>
                        <th className="RootPostsTableCell">User</th>
                        <th className="RootPostsTableCell">Created</th>
                        <th className="RootPostsTableCell">Post</th>                                                
                        <th className="RootPostsTableCell"></th>                        
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => <RootPost post={post}/>)}                
                </tbody>
            </table>
        </>
    )
}

export default PopularRootPosts