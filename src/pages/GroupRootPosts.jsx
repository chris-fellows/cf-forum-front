import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Post } from "./Post.jsx"

// Displays root posts for group (Posts.GroupId=X, Posts.Sequence=1)
// Params: GroupId
const GroupRootPosts = ({groupId}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchAllGroupPosts = () => {
            try{
                console.log("Fetching group posts 100");
                fetch("http://localhost:8800/groupposts?id=" + groupId)
                    .then((response) => response.json())
                    .then((data) => setPosts(data))
                    .catch((error2) => console.log("Error in catch"));

                console.log("Fetching group posts 200");
                console.log(groups);
                                                
            } catch (error) {
                console.log("Fetched group posts response: Error");
                console.log(error);
            }
        }

        console.log("Calling fetchAllGroupPosts");
        fetchAllGroupPosts();
        console.log("Called fetchAllGroupPosts");
    }, []);

    return
        <div>GroupPosts (Lists first post for each thread)</div>
        {posts.map(post => (     
            <Post id={post.id} />
        ))}
}

export default GroupRootPosts