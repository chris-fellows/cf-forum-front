import { useInject2 } from "../useInject";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';
import { ISecurityService } from "../serviceInterfaces";
import { useAuth } from "../authContext";

// Current user info (Logged in user name or Log in/Register functions)
// Params: None
const CurrentUser = () => {   
   const userInfo = getUserInfo(); 
   const { clearToken } = useAuth();   
   const securityService = useInject2<ISecurityService>('securityService');

   const navigate = useNavigate()

   const style = {
    display: "inline-block",
    fontSize: "10px"   // TODO: Remove nasty hard-coding    
  };    
   
    // Handle log out click
     const handleLogOutClick = async () => {       
        const result = await securityService.Logout();
        console.log("Log out response:");
        console.log(result);

        if (result.loggedOut) {      
            clearToken();            
            navigate("/");    // Home
        } else {
            window.alert("Failed to log out");
        }
     }

     // Handle log in click
     const handleLogInClick = async () => { 
        navigate("/login");
     }

     // Handle register click
     const handleRegisterClick = async () => { 
      navigate("/userregistration");
   }

   const isLoggedIn = userInfo.userName.length > 0;

   // Allow log out if logged in
     if (isLoggedIn) return ( 
         <>
            <div style={style}>{userInfo.userName}</div>
            <button style={style} onClick={() => handleLogOutClick()}>Log out</button>
         </>
     )

     // Allow log in or register
     return (
      <>
         <button style={style} onClick={() => handleLogInClick()}>Log in</button>
         <button style={style} onClick={() => handleRegisterClick()}>Register</button>
      </>
     )
};

export default CurrentUser;