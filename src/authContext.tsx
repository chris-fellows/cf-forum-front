import './App.css';
import React, { createContext, useContext } from 'react';
import useToken from './useToken';

export interface IMyAuth
{
    setToken: (userToken: string) => void
    clearToken: () => void
    token: string       
}

interface AuthProps {
    //auth : IMyAuth
    children: React.ReactNode
}

export const AuthContext = createContext<IMyAuth>({ setToken: (test: string) => {},
            clearToken: () => {},
            token: ""});

export const AuthProvider = ({ children} : AuthProps) => {
  //localStorage.removeItem('token');
  const { token, setToken, clearToken } = useToken();  

  return <AuthContext.Provider value={{setToken, clearToken, token}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);