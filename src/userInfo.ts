import { ICurrentUserInfo, ITokenPayload } from "./Interfaces";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Returns current user info (Not set if logged out)
export default function getUserInfo () : ICurrentUserInfo {  
    const tokenString = localStorage.getItem('token')!;       
    if (tokenString == null)
    {
        return {            
            userName: "",
            userId: "",
            role: "",
            token: ""
        };
    }    
    const decoded = jwtDecode(tokenString);
    const payload = jwtDecode<ITokenPayload>(tokenString);                
    if (decoded.exp != null)
        {
          if (decoded.exp * 1000 < Date.now()) {
              console.log("getUserInfo: Token expired" + decoded.exp.toString());              
              return {            
                userName: "",
                userId: "",
                role: "",
                token: ""
            };
          }
        }

    return {        
        userName: payload.username,
        userId: payload.userid.toString(),        
        role: payload.role,
        token: tokenString       
    };

    //const userToken = JSON.parse(tokenString);    
    //return userToken;    
}
