import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useInject2 } from "../useInject";
import { IPasswordService } from "../serviceInterfaces";
import { IUsersService } from "../serviceInterfaces";
import getUserInfo from '../userInfo';

// User reset password
// Params: None
const UserResetPassword = () => {
    const userInfo = getUserInfo();        
    const [username, setUserName] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const passwordService = useInject2<IPasswordService>('passwordService');

    const usersService = useInject2<IUsersService>('usersService');  

    const navigate = useNavigate();
      
        const handleSubmit = async (e: any) => {        
            e.preventDefault();
            try
            {
                if (password1 != password2)
                {
                    window.alert("Password confirmed is different");
                }
                else if (passwordService.isValidPasswordFormat(password1))
                {
                    const result = await usersService.AddUserForgotPassword(username);                                                                  
                    navigate("/login");
                }
                else
                {
                    window.alert("Password is not a valid format");
                }
            }
            catch (error)
            {
                window.alert("Error resetting password");
            }
        }

    if (userInfo.isLoggedIn) return <div>Logged in</div>;

    return (
        <>
        <h3>Enter new password</h3>
                <form onSubmit={handleSubmit}>
                    <ul style={ { listStyleType: "none" } }>
                        <li>
                            <label htmlFor={"username"}>User:</label><input type="text" id={"username"} onChange={e => setUserName(e.target.value) } />
                        </li>
                        <li>
                            <label htmlFor={"userpassword"}>Password:</label><input type="password" id= {"userpassword"} onChange={e => setPassword1(e.target.value)} />        
                        </li>       
                        <li>
                            <label htmlFor={"userpassword"}>Confirm Password:</label><input type="password" id= {"userpasswordconfirm"} onChange={e => setPassword2(e.target.value)} />        
                        </li>       
                    </ul>
                    <div>
                        <button type="submit" >Submit</button>
                    </div>                    
                </form>
        </>
    )
}

export default UserResetPassword