import { ICurrentUserInfo } from "./Interfaces";

// Returns current user info (Not set if logged out)
export default function getUserInfo () : ICurrentUserInfo {  
    const tokenString = localStorage.getItem('token')!;            
    const userToken = JSON.parse(tokenString);    
    return userToken;    
}
