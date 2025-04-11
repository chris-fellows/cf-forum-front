import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject, useInject2 } from "../DependencyInjection";
import { addUserForgotPasswordServiceType } from "../Interfaces";
import getUserInfo from '../userInfo';

// User forgot password
// Params: None
const UserForgotPassword = () => {
    const userInfo = getUserInfo();        
    const [username, setUserName] = useState<string>("");

    const addUserForgotPasswordService = useInject2<addUserForgotPasswordServiceType>('addUserForgotPasswordService');  

    const navigate = useNavigate();

      // Handle submit of credentials
        const handleSubmit = async (e: any) => {        
            e.preventDefault();
            try
            {
                const result = await addUserForgotPasswordService(username);                
                  
                // Navigate home                        
                navigate("/userforgotpasswordsent");
            }
            catch (error)
            {
                window.alert("Error handling forgot password");
            }
        }

    if (userInfo.isLoggedIn) return <div>Logged in</div>;

    return (
        <>
        <h3>Enter username to reset password for</h3>
                <form onSubmit={handleSubmit}>
                    <ul style={ { listStyleType: "none" } }>
                        <li>
                            <label htmlFor={"username"}>User:</label><input type="text" id={"username"} onChange={e => setUserName(e.target.value) } />
                        </li>                       
                    </ul>
                    <div>
                        <button type="submit" >Submit</button>
                    </div>                    
                </form>
        </>
    )
}

export default UserForgotPassword