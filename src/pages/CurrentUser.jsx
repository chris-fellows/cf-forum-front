import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useInject } from "../DependencyInjection";
import { useNavigate } from "react-router-dom";
import clearToken from '../clearToken';
import getUserInfo from '../userInfo';

// Current user info (Name, option to log out)
// Params: None
const CurrentUser = () => {   
   const userInfo = getUserInfo(); 
   const [isLoggedIn, setIsLoggedIn] = useState(userInfo != undefined);   
   const logoutService = useInject('logoutService');

   const navigate = useNavigate()

   const style = {
    display: "inline-block",
    fontSize: "10px"   // TODO: Remove nasty hard-coding    
  };    
   
    // Handle log out click
     const handleLogOutClick = async () => {       
        const result = await logoutService();
        console.log("Log out response:");
        console.log(result);

        if (result.loggedOut) {
            clearToken();
            setIsLoggedIn(false);
        } else {
            window.alert("Failed to log out");
        }
     }

     // Handle log in click
     const handleLogInClick = async () => { 
        navigate("/login");
     }

     if (isLoggedIn) return ( <><div style={style}>{userInfo.userName}</div><button style={style} onClick={() => handleLogOutClick()}>Log out</button></> )

     return <button style={style} onClick={() => handleLogInClick()}>Log in</button>
};

export default CurrentUser;