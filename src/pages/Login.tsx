import { useState, useEffect } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';
import { IUserCredentials, loginServiceType } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../authContext";

// Login for user
// Params: 
const Login = () => {    
    const userInfo = getUserInfo();        
    const { token, setToken } = useAuth();
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginService = useInject2<loginServiceType>('loginService');

    const navigate = useNavigate()

    const loginUser = async (credentials: IUserCredentials)  => {
        const data = await loginService(credentials)
        return data;
    }

    // Handle submit of credentials
    const handleSubmit = async (e: any) => {        
        e.preventDefault();
        try
        {
            const result = await loginUser({
                username: username,
                password: password
            });              

            console.log(result);                    
            console.log("Login: Saving token " + result);
            setToken(result);
            console.log("Login: Saved token");

            //console.log("Decoding JWT:");
            const decoded = jwtDecode(result);
            //console.log(decoded);

              // Navigate home        
            console.log("Login: Navigating home");
            navigate("/");
        }
        catch (error)
        {
            window.alert("Failed to log in");
        }
    }

    /*
    <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                    <button type="submit" >Submit</button>
                    </div>
    */

    // Sanity check if logged in already
    const isLoggedIn = (userInfo.userName.length > 0);    
    if (isLoggedIn) return <div>Logged in</div>;
    
        return(
            <>
                <h3>Enter username and password</h3>
                <form onSubmit={handleSubmit}>
                    <ul style={ { listStyleType: "none" } }>
                        <li>
                            <label htmlFor={"username"}>User:</label><input type="text" id={"username"} onChange={e => setUserName(e.target.value) } />
                        </li>
                        <li>
                            <label htmlFor={"userpassword"}>Password:</label><input type="password" id= {"userpassword"} onChange={e => setPassword(e.target.value)} />        
                        </li>                    
                    </ul>
                    <div>
                        <button type="submit" >Submit</button>
                    </div>                    
                </form>
            </>
          )
}

export default Login