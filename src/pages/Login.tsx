import { useState, useEffect } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';
import { IUserCredentials, loginServiceType } from "../Interfaces";
import { jwtDecode, JwtPayload } from "jwt-decode";

// TODO: Change to JWT
// Login for user
// Params: 
const Login = ({setToken}: any) => {
    console.log("Entered Login function");

    const userInfo = getUserInfo(); 
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginService = useInject2<loginServiceType>('loginService');

    const loginUser = async (credentials: IUserCredentials)  => {
        const data = await loginService(credentials)
        return data;
    }

    // Handle submit of credentials
    const handleSubmit = async (e: any) => {        
        e.preventDefault();
        const token = await loginUser({
          username: username,
          password: password
        });
        console.log("Login response:");
        console.log(token);
        
        setToken(token);

        console.log("Decoding JWT:");
        const decoded = jwtDecode(token);
        console.log(decoded);

        /*
        if (token.token.length > 0) {   // Logged in
            setToken(token);
            console.log("Log in success");
        } else {            
            window.alert("Log in failed");
        }
        */
    }

    // Sanity check if logged in already
    //const isLoggedIn = (userInfo.userName.length > 0);
    const isLoggedIn = false;
    if (isLoggedIn) return <div>Logged in</div>;
    
        return(
            <>
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit}>
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
                </form>
            </>
          )
}

export default Login