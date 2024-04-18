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
import useToken from './useToken';

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
    logoutService: async (token) => {       
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token)
      };     
       const response = await fetch("http://localhost:8800/security/logout", requestOptions)
       const data = await response.json()      
       return data;
    },
    getGroupsService: async () => {    
      //const url = this.resolve["myAppConfigService"].backendURL;
      //console.log("getGroupsServiceURL=" + url);      
      const response = await fetch("http://localhost:8800/groups")
      const data = await response.json()      
      return data;
    },
    getGroupService: async (id) => {       
      const response = await fetch("http://localhost:8800/groups/" + id)
      const data = await response.json()      
      return data;
    },
    getRootPostsByGroupService: async (id) => {  // GroupID
      const response = await fetch("http://localhost:8800/rootposts/bygroup/" + id)
      const data = await response.json()      
      return data;
    },
    getPostsByRootPostService: async (postId, pageSize, pageNumber) => { 
      const response = await fetch("http://localhost:8800/posts/byroot/" + postId + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber)
      const data = await response.json()      
      return data;
    },
    getPostsByUserService: async (userid, pageSize, pageNumber) => { 
      const response = await fetch("http://localhost:8800/posts/byuser/" + userid + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber)
      const data = await response.json()      
      return data;
    },
    deletePostByIdService: async (postId) => { 
      const response = await delete("http://localhost:8800/posts/" + postId)
      const data = await response.json()      
      return data;
    },
    updatePostByIdService: async (postId, details) => { 
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      };     
       const response = await fetch("http://localhost:8800/posts/" + postId, requestOptions)
       const data = await response.json()      
      return data;
    },
    upvotePostByIdService: async (postId, userId) => { 
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      };     
       const response = await fetch("http://localhost:8800/posts/" + postId + "/upvote", requestOptions)
       const data = await response.json()      
      return data;
    },
    downvotePostByIdService: async (postId, userId) => { 
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      };     
       const response = await fetch("http://localhost:8800/posts/" + postId + "/downvote", requestOptions)
       const data = await response.json()      
      return data;
    },
    getUserService: async (id) => {       
      const response = await fetch("http://localhost:8800/users/" + id)
      const data = await response.json()      
      return data;
    },
    getUsersService: async () => {       
      const response = await fetch("http://localhost:8800/users")
      const data = await response.json()      
      return data;
    },
    getRandomAdvertsService: async (number) => {       
      const response = await fetch("http://localhost:8800/adverts/random/" + number)
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
          <Route path="/userposts" element={<UserPosts />}/> 
          <Route path="/users" element={<Users />}/> 
        </Routes>                          
    </div>
    </ContainerProvider>
  );
}

export default App;
