import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { IUser } from "../Interfaces";
import getUserInfo from "../userInfo";
import { getUsersServiceType } from "../Interfaces";
import LoginCheck from "./LoginCheck";
import useFindDelay from "../useFindDelay";

// Users information
// Params: None
const Users = () => {
    const [users, setUsers] = useState<IUser[]>([])        
    const [find, setFind] = useState<string>("");
    const { findInternal, setFindInternal } = useFindDelay(setFind, 1000);    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);
    const getUsersService = useInject2<getUsersServiceType>('getUsersService');      

    const navigate = useNavigate()

    useEffect(() => {
        console.log("Searching users for " + find + " (Find internal=" + findInternal + ")");
        const fetchUsers = async () => {            
            const data = await getUsersService(find, 1000000, 1)                        
            setUsers(data);
            activeQueries.current--;            
            if (activeQueries.current == 0) setIsLoading(false);            
        }
        
        activeQueries.current = 1;        
        setIsLoading(true);
        fetchUsers();

        /* Simulate slow load
        setTimeout(function(){
            fetchUsers();
        }, 3000);        
        */
    }, [find]);    

    if (isLoading && getUserInfo().userName.length) {        
        return <Loading />;
    }
         
    return (
        <>
            <LoginCheck/>
            <div>Manage Users</div> 
            <label htmlFor={"userfind"}>Search:</label><input type="text" id={"userfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />            
            <table className="UsersTable">
                <thead>
                    <tr>
                        <th className="UsersTableCell">Name</th>
                        <th className="UsersTableCell">Email</th>
                        <th className="UsersTableCell">Role</th>
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
                            <td className="UsersTableCell">{user.UserRoleName}</td>   
                            <td className="UsersTableCell"><Link to={"/useredit?userid=" + user.ID }>Edit</Link></td>
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