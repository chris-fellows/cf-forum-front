import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import LoaderOverlay from "./LoaderOverlay";
import { IUser } from "../Interfaces";
import { getUsersServiceType } from "../Interfaces";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoginCheck from "./LoginCheck";
import SearchBar from "./SearchBar";
import appConfig from "../appConfig";

// Users information
// Params: None
const Users = () => {
    const [users, setUsers] = useState<IUser[]>([])        
    const [find, setFind] = useState<string>("");    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);
    const getUsersService = useInject2<getUsersServiceType>('getUsersService');      

    const navigate = useNavigate()

    useEffect(() => {
        console.log("Searching users for " + find);
        const fetchUsers = async () => {            
            const data = await getUsersService(find, 1000000, 1)                        
            setUsers(data);
            activeQueries.current--;            
            if (activeQueries.current == 0) setIsLoading(false);            
        }
        
        activeQueries.current = 1;        
        setIsLoading(true);
        fetchUsers();
                    
        /*
        setTimeout(function(){            
            fetchUsers();
        }, 3000);                        
        */
    }, [find]);  
    
    // Set function for export CSV
    const getCSVLine = (user : IUser, delimiter : string) : string => {
        const line = `${user.ID}${delimiter}${user.Email}${delimiter}${user.Name}${delimiter}${user.UserRoleName}\n`;
        return line;
    };
            
    // <label htmlFor={"userfind"}>Search:</label><input type="text" id={"userfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />            
    return (
        <>
            <LoginCheck/>
            <div>Manage Users</div>             
            <LoaderOverlay loading={isLoading} message="Loading users..."/>           
            <SearchBar setFind={setFind} delay={appConfig.searchDelay} /><br/>
            <DownloadItemsCSV title="Download"
                    columns={["ID", "Email", "Name", "Role"]} 
                    items={users} 
                    file= { "Users" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                    getLine={getCSVLine} />
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