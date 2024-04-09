import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject } from "../DependencyInjection";
import Post from "./Post.jsx"

// Displays posts for thread. Root post first then every other post
// Params: PostId (Root post)
const ThreadPosts = () => {
    const [posts, setPosts] = useState([])
    const getPostsByRootPostService = useInject('getPostsByRootPostService');  

    const [searchParams] = useSearchParams();
    //const groupId = searchParams.get("groupid");
    const postId = searchParams.get("postid");

    console.log("ThreadPosts:" + postId);

    useEffect(() => {
        //console.log("Entered ThreadPosts:" + postId);

        // TODO: Implement paging
        const fetchPosts = async () => {
            console.log("calling getPostsByRootPostService");
            const data = await getPostsByRootPostService(postId)
            console.log("called getPostsByRootPostService");
            setPosts(data);
            console.log(data);
            console.log("set posts in state");
        }

        fetchPosts();
    }, []);

    // TODO: Optimise this and pass all post parameters so that the Post component doesn't have to load
    // post from backend.
    return (
        <>
            <div>ThreadPosts (Lists all posts for a specific thread)</div>
            {posts.map(post => (<Post post={post} />))}
        </>
    )
}

export default ThreadPosts