import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
//import { useNavigate } from "react-router-dom";
import Post from "./Post.jsx"
import RootPost from "./RootPost.jsx";
import { useSearchParams } from 'react-router-dom';

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = () => {        
    const [posts, setPosts] = useState([])
    const getRootPostsByGroupService = useInject('getRootPostsByGroupService');  

    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("groupid");

    useEffect(() => {
        console.log("Entered GroupRootPosts:" + groupId);

        const fetchRootPosts = async () => {
            console.log("calling getRootPostsByGroupService");
            const data = await getRootPostsByGroupService(groupId, 1000, 1) // pageSize, pageNumber
            console.log("called getRootPostsByGroupService");
            setPosts(data);
            console.log(data);
            console.log("set posts in state");
        }

        fetchRootPosts();
    }, []);
    
    // Display root post (Summary)
    // {posts.map(post => <div key={post.ID} class="Post">{post.ID} {post.Text}</div>)}
    return (
        <>
            {posts.map(post => <RootPost post={post}/>)}            
        </>
    )          
}

export default GroupRootPosts