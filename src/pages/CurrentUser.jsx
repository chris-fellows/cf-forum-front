import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import clearToken from '../clearToken';
import getUserInfo from '../userInfo';

// Current user info (Name, option to log out)
// Params: None
const CurrentUser = () => {   
   const userInfo = getUserInfo(); 
   const [isLoggedIn, setIsLoggedIn] = useState(userInfo != undefined);   

   const navigate = useNavigate()

      // TODO: Fix this. Can't use DI
    const logoutService = async () => {       
        const response = await fetch("http://localhost:8800/security/logout")
        const data = await response.json()      
        return data;
    }

    // Handle log out click
     const handleLogOutClick = async () => { 
        //await logoutService();
        clearToken();
        setIsLoggedIn(false);
     }

     // Handle log in click
     const handleLogInClick = async () => { 
        navigate("/");  // Home
     }

     if (isLoggedIn) return ( <><div>{userInfo.userName}</div><button onClick={() => handleLogOutClick()}>Log out</button></> )

     return <button onClick={() => handleLogInClick()}>Log in</button>
};

export default CurrentUser;