import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
//import { useInject } from "../DependencyInjection";

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// Login for user
// Params: 
const Login = ({setToken}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    //const loginService = useInject('loginService');   // Can't use DI at the moment

    const loginUser = async (credentials)  => {
        const data = await loginService(credentials) // pageSize, pageNumber            
        return data;
       }

    // TODO: Fix this. Can't use DI
    const loginService = async (credentials) => {       
        
        console.log("Calling service login");
        console.log(JSON.stringify(credentials));
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };
        const response = await fetch("http://localhost:8800/security/login", requestOptions)
        const data = await response.json()      
        return data;
    }

    const handleSubmit = async e => {        
        e.preventDefault();
        const token = await loginUser({
          username: username,
          password: password
        });
        console.log(token);
        setToken(token);
      }
    
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