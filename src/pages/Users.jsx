import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject } from "../DependencyInjection";

// Users information
// Params: None
const Users = () => {
    const [users, setUsers] = useState([])
    const getUsersService = useInject('getUsersService');  

    useEffect(() => {
        const fetchUsers = async () => {            
            const data = await getUsersService()            
            setUsers(data);                        
        }

        fetchUsers();
    }, []);
        
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.ID}>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td><button>Edit</button></td>
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Users