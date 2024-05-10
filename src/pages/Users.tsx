import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { IUser } from "../Interfaces";
import getUserInfo from "../userInfo";
import { getUsersServiceType } from "../Interfaces";
import LoginCheck from "./LoginCheck";

// Users information
// Params: None
const Users = () => {
    const [users, setUsers] = useState<IUser[]>([])    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const getUsersService = useInject2<getUsersServiceType>('getUsersService');  

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {            
            const data = await getUsersService()    
            console.log(data);
            setUsers(data);
            setIsLoading(false);
        }

        fetchUsers();
    }, []);

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
        
    return (
        <>
            <LoginCheck/>
            <div>Manage Users</div>          
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.ID}>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>                            
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