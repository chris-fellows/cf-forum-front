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
    let countActiveQueries = 0;

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {            
            const data = await getUsersService()            
            setUsers(data);
            countActiveQueries--;
            if (countActiveQueries == 0) setIsLoading(false);
        }

        countActiveQueries = 1;
        setIsLoading(true);
        fetchUsers();
    }, []);

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
        
    return (
        <>
            <LoginCheck/>
            <div>Manage Users</div>          
            <table className="UsersTable">
                <thead>
                    <tr>
                        <th className="UsersTableCell">Name</th>
                        <th className="UsersTableCell">Email</th>
                        <th className="UsersTableCell"></th>
                        <th className="UsersTableCell"></th>                        
                        <th className="UsersTableCell"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.ID}>
                            <td className="UsersTableCell">{user.Name}</td>
                            <td className="UsersTableCell">{user.Email}</td>                            
                            <td className="UsersTableCell"><Link to={"/userdetails?userid=" + user.ID }>Edit</Link></td>
                            <td className="UsersTableCell"><Link to={"/userposts?userid=" + user.ID }>Posts</Link></td>
                            <td className="UsersTableCell"><Link to={"/auditevents?userid=" + user.ID }>Audit Events</Link></td>
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Users