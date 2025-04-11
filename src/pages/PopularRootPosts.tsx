import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
import RootPost from "./RootPost";
import { IPost, getRootPostsByPopularityServiceType } from "../Interfaces";
import getUserInfo from '../userInfo';

// Displays N most popular root posts
const PopularRootPosts = ( { maxPosts = 1 }) => {
    const userInfo = getUserInfo();     
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);  

    const getRootPostsByPopularityService = useInject2<getRootPostsByPopularityServiceType>('getRootPostsByPopularityService');  

    useEffect(() => {                  
        const fetchPosts = async () => {                        
            const data = await getRootPostsByPopularityService("", maxPosts, 1);
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