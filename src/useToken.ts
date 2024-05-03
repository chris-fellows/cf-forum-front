import { useState } from 'react';
import { ICurrentUserInfo } from './Interfaces';

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
