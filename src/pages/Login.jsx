import { useState, useEffect } from "react"
import { useInject } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// Login for user
// Params: 
const Login = ({setToken}) => {
    const userInfo = getUserInfo(); 
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const loginService = useInject('loginService');

    const loginUser = async (credentials)  => {
        const data = await loginService(credentials)
        return data;
       }

    // TODO: Fix this. Can't use DI
    //const loginService = async (credentials) => {                     
    //    const requestOptions = {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify(credentials)
    //    };
    //    const response = await fetch("http://localhost:8800/security/login", requestOptions)
    //    const data = await response.json()      
    //    return data;
    //}

    // Handle submit of credentials
    const handleSubmit = async e => {        
        e.preventDefault();
        const token = await loginUser({
          username: username,
          password: password
        });
        //console.log("Login response:");
        //console.log(token);
        if (token.token.length > 0) {   // Logged in
            setToken(token);
            console.log("Log in success");
        } else {            
            window.alert("Log in failed");
        }
    }

    // Sanity check if logged in already
    const isLoggedIn = (userInfo != undefined);
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