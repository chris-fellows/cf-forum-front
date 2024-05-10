import { useState } from 'react';
//import { ICurrentUserInfo } from './Interfaces';
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function useToken() {
  const getToken = () => {    
    const tokenString = localStorage.getItem('token')!;

    // Check token is actvie
    if (tokenString) {
        //console.log("getToken: Checking if token valid");
        const decoded = jwtDecode<JwtPayload>(tokenString);
        if (decoded.exp != null)
        {
          if (decoded.exp * 1000 < Date.now()) {
              console.log("getToken: Token expired" + decoded.exp.toString());
              //localStorage.removeItem('token');
              return "";              
          }
        }
    }
    
    return tokenString
  };

  const [token, setToken] = useState<string>(getToken());

  const saveToken = (userToken : string) => {
    //localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('token', userToken);
    //setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

/*
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')!;            
    const userToken = JSON.parse(tokenString);    
    return userToken?.token
  };

  const [token, setToken] = useState<string>(getToken());

  const saveToken = (userToken : ICurrentUserInfo) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}
*/