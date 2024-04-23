import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Groups from "./pages/Groups.jsx"
//import Group from "./pages/GroupInfo.jsx"
import DITestComponent from './pages/DITestComponent.jsx';
import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import { useInject, useContainer } from './DependencyInjection.js';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CurrentUser from './pages/CurrentUser.jsx';
import Help from './pages/Help.jsx';
import Home from './pages/Home.jsx';
import GroupRootPosts from './pages/GroupRootPosts.jsx';
import GroupInfo from './pages/GroupInfo.jsx';
import Login from './pages/Login.jsx';
import NavBar from './pages/NavBar.jsx';
import ThreadPosts from './pages/ThreadPosts.jsx';
import UserPosts from './pages/UserPosts.jsx';
import Users from './pages/Users.jsx';
import User from './pages/User.jsx';
import useToken from './useToken';
import getUserInfo from './userInfo.js';

// https://www.youtube.com/watch?v=fPuLnzSjPLE&t=3s
// Pages:
// Group list
// - Displays list of groups.
// - Click on group opens group.
// Group
// - Displays list of group posts (Post.Sequence=1)
// - Click on group post opens group posts.

// Create a new context for the container
export const ContainerContext = createContext();

// Define a component that provides the container to its children
const ContainerProvider = ({ container, children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

// Test service
const MyService = () => {
  return { foo: 'bar' };
};

//const backendURL = "http://localhost:8880";

const MyAppConfigService =() => {
  return { 
          backendURL: "http://localhost:8880",
           //backendURL: process.env.BACKEND_URL,
           message: "Hello from MyAppConfigService" 
        };
}

// Define container for dependencies
const container = {
  items: {
    myService: MyService(),
    myAppConfigService: MyAppConfigService(),
    userRoleService: new UserRoleService(),
    loginService: async (credentials) => {       
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
      };
      const response = await fetch("http://localhost:8800/security/login", requestOptions)
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
       const response = await fetch("http://localhost:8800/security/logout", requestOptions)
       const data = await response.json()      
       return data;
    },
    getGroupsService: async () => {    
      //const url = this.resolve["myAppConfigService"].backendURL;
      //console.log("getGroupsServiceURL=" + url);      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };                   
      const response = await fetch("http://localhost:8800/groups", requestOptions)
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
      const response = await fetch("http://localhost:8800/groups/" + id, requestOptions)
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
      const response = await fetch("http://localhost:8800/rootposts/bygroup/" + id, requestOptions)
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
      const response = await fetch("http://localhost:8800/posts/byroot/" + postId + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
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
      const response = await fetch("http://localhost:8800/posts/byuser/" + userid + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
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
      const response = await delete("http://localhost:8800/posts/" + postId, requestOptions)
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
       const response = await fetch("http://localhost:8800/posts/" + postId, requestOptions)
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
       const response = await fetch("http://localhost:8800/posts/" + postId + "/vote", requestOptions)
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
       const response = await fetch("http://localhost:8800/posts/" + postId + "/track", requestOptions)
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
      const response = await fetch("http://localhost:8800/users/" + id, requestOptions)
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
      const response = await fetch("http://localhost:8800/users", requestOptions)
      const data = await response.json()      
      return data;
    },
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
      const response = await fetch("http://localhost:8800/adverts/random/" + number, requestOptions)
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
