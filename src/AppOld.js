import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DITestComponent from './pages/DITestComponent.jsx';
import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import { useInject, useContainer } from './DependencyInjection.js';
import About from './pages/About.js'
import Contact from './pages/Contact.js';
import Help from './pages/Help.js';
import Home from './pages/Home.js';
import GroupRootPosts from './pages/GroupRootPosts.js';
import GroupInfo from './pages/GroupInfo.js';
import Groups from "./pages/Groups.js"
import Login from './pages/Login.js';
import NavBar from './pages/NavBar.js';
import ThreadPosts from './pages/ThreadPosts.js';
import UserPosts from './pages/UserPosts.js';
import Users from './pages/Users.js';
import User from './pages/User.js';
import appConfig from './appConfig.js';
import useToken from './useToken.js';
import getUserInfo from './userInfo.js';

// Create a new context for the container
export const ContainerContext = createContext();

// Define a component that provides the container to its children
const ContainerProvider = ({ container, children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

/*
// Test service
const MyService = () => {
  return { foo: 'bar' };
};
*/

//const backendURL = "http://localhost:8880";

/*
const MyAppConfigService =() => {
  return { 
          backendURL: "http://localhost:8880",
           //backendURL: process.env.BACKEND_URL,
           message: "Hello from MyAppConfigService" 
        };
}
*/

// Define container for dependencies
const container = {
  items: {
    //myService: MyService(),
    //myAppConfigService: MyAppConfigService(),
    userRoleService: new UserRoleService(),
    loginService: async (credentials) => {       
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
      };
      const response = await fetch(appConfig.backendURL + "/security/login", requestOptions)
      const data = await response.json()      
      return data;        
    },
    logoutService: async () => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }        
      };     
       const response = await fetch(appConfig.backendURL + "/security/logout", requestOptions)
       const data = await response.json()      
       return data;
    },
    getGroupsService: async () => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };                   
      const response = await fetch(appConfig.backendURL + "/groups", requestOptions)
      const data = await response.json()      
      return data;
    },
    getGroupService: async (id) => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/groups/" + id, requestOptions)
      const data = await response.json()      
      return data;
    },
    addPostService: async (post) => {
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(post)
      };       
      const response = await fetch(appConfig.backendURL + "/posts", requestOptions)
      const data = await response.json()      
      return data;
    },
    getRootPostsByGroupService: async (id) => {  // GroupID
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/rootposts/bygroup/" + id, requestOptions)
      const data = await response.json()      
      return data;
    },
    getPostsByRootPostService: async (postId, pageSize, pageNumber) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/posts/byroot/" + postId + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
    getPostsByUserService: async (userid, pageSize, pageNumber) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/posts/byuser/" + userid + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
    deletePostByIdService: async (postId) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/posts/" + postId, requestOptions)
      const data = await response.json()      
      return data;
    },
    updatePostByIdService: async (postId, details) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(details)
      };     
       const response = await fetch(appConfig.backendURL + "/posts/" + postId, requestOptions)
       const data = await response.json()      
      return data;
    },
    votePostByIdService: async (postId, details) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(details)
      };     
       const response = await fetch(appConfig.backendURL + "/posts/" + postId + "/vote", requestOptions)
       const data = await response.json()      
      return data;
    },   
    trackPostByIdService: async (postId, details) => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(details)
      };     
       const response = await fetch(appConfig.backendURL + "/posts/" + postId + "/track", requestOptions)
       const data = await response.json()      
      return data;
    },   
    getUserService: async (id) => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/users/" + id, requestOptions)
      const data = await response.json()      
      return data;
    },
    getUsersService: async () => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/users", requestOptions)
      const data = await response.json()      
      return data;
    },
    //getRandomAdvertsService: async (number : number) : Promise<IAdvert[]> => {   
    getRandomAdvertsService: async (number) => {   
      const userInfo = getUserInfo();
      console.log("getRandomAdvertsService:");
      console.log(userInfo);
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + userInfo.token      
        }
      };           
      const response = await fetch(appConfig.backendURL + "/adverts/random/" + number, requestOptions)
      const data = await response.json()      
      return data;
    }
  },
  resolve(identifier) {
    if (!this.items.hasOwnProperty(identifier)) {
      throw new Error(`Object with identifier ${identifier} not found in container`);
    }
    return this.items[identifier];
  }
};

function App() {
  const { token, setToken } = useToken();  

  // Login if no token
  if(!token) {
    return (
    <ContainerProvider container={container}> 
      <div className="App">        
        <Login setToken={setToken} />
      </div>
    </ContainerProvider>
    )
  }

  //const userInfo = getUserInfo();

  return (
  <ContainerProvider container={container}>          
    <div className="App">                   
        <NavBar />
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/groups" element={<Groups />}/>
          <Route path="/groupinfo" element={<GroupInfo />}/>                    
          <Route path="/grouprootposts" element={<GroupRootPosts />}/>          
          <Route path="/login" element={<Login setToken={setToken} />}/>
          <Route path="/threadposts" element={<ThreadPosts />}/> 
          <Route path="/userdetails" element={<User />}/> 
          <Route path="/userposts" element={<UserPosts />}/>                     
          <Route path="/users" element={<Users />}/>           
        </Routes>                          
    </div>
    </ContainerProvider>
  );
}

export default App;
