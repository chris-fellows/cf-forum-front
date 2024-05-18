import { useState } from 'react';
import { jwtDecode, JwtPayload } from "jwt-decode";

// Handles token management. Persisted to local storage
export default function useToken() {
  const getToken = () => {    
    const tokenString = localStorage.getItem('token')!;

    // Check token is actvie
    if (tokenString) {        
        const decoded = jwtDecode<JwtPayload>(tokenString);
        if (decoded.exp != null)
        {
          if (decoded.exp * 1000 < Date.now()) {
              console.log("getToken: Token expired" + decoded.exp.toString());
              //localStorage.removeItem('token');
              return "";              
          }
        }
    } else {
      console.log("getToken: No token");
    }
    
    return tokenString
  };

  const [token, setToken] = useState<string>(getToken());  

  const saveToken = (userToken : string) => {          
      console.log("saveToken: " + userToken);
      localStorage.setItem('token', userToken);      
      setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken("");
  }
 
  return {
    setToken: saveToken,
    clearToken: clearToken,
    token
  }
}
