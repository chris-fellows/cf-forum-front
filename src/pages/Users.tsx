import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";
import { Link } from "react-router-dom";
import { IUser } from "../Interfaces";

// Users information
// Params: None
const Users = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const getUsersService = useInject('getUsersService');  

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {            
            const data = await getUsersService()    
            console.log(data);
            setUsers(data);                        
        }

        fetchUsers();
    }, []);

    // Handle user posts click
    //const handleUserPostsClick = async (userId) => {                           
    //    navigate("/userposts?userid=" + userId);
    //}
        
    return (
        <>
            <div>Manage Users</div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Posts</th>
                        <th>Posts2</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.ID}>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td><button>Edit</button></td>                            
                            <td><Link to={"/userdetails?userid=" + user.ID }>Edit</Link></td>
                            <td><Link to={"/userposts?userid=" + user.ID }>Posts</Link></td>
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Users