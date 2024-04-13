import { useState } from 'react';

// Returns current user info (Not set if logged out)
export default function getUserInfo() {  
    const tokenString = localStorage.getItem('token');            
    const userToken = JSON.parse(tokenString);    
    return userToken;    
}
