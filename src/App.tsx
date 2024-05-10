//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import DITestComponent from './pages/DITestComponent.jsx';
import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import About from './pages/About'
import Contact from './pages/Contact';
import Help from './pages/Help';
import Home from './pages/Home';
import GroupRootPosts from './pages/GroupRootPosts';
import GroupInfo from './pages/GroupInfo';
import Groups from "./pages/Groups"
import Login from './pages/Login';
import NavBar from './pages/NavBar';
import ThreadPosts from './pages/ThreadPosts';
import UserPosts from './pages/UserPosts';
import Users from './pages/Users';
import User from './pages/User';
import appConfig from './appConfig';
import useToken from './useToken';
import getUserInfo from './userInfo';
import { IAdvert, IAuditEvent, IGroup, INewPost, IPost, IUser, IUserPostInfoVote, IUserCredentials, IUserPostInfoTrack } from './Interfaces';
import AuditEvents from './pages/AuditEvents';

interface IMyContainer
{
    items : any
    resolve(any : string) : any    
}

interface ContainerProps {
  container: IMyContainer
  children: React.ReactNode  
}

// Create a new context for the container
export const ContainerContext = createContext<IMyContainer | null>(null);

// Define a component that provides the container to its children
const ContainerProvider = ({ container, children } : ContainerProps) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

// Define container for dependencies
const container = {
  items: {    
    //userRoleService: new UserRoleService(),
    loginService: async (credentials : IUserCredentials) => {       
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
    getGroupsService: async () : Promise<IGroup[]> => {      
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
    getGroupService: async (id : string) : Promise<IGroup[]> => {       
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
    addPostService: async (post : INewPost) => {
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
    getRootPostsByGroupService: async (id : string, pageSize : number, pageNumber : number) : Promise<IPost[]> => {  // GroupID
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/rootposts/bygroup/" + id + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
    getPostsByRootPostService: async (postId : string, pageSize : number, pageNumber : number) : Promise<IPost[]> => { 
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
    getPostsByUserService: async (userid : string, pageSize : number, pageNumber : number) : Promise<IPost[]> => { 
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
    deletePostByIdService: async (postId : string) => { 
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
    updatePostByIdService: async (postId : string, details : any) => { 
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
    votePostByIdService: async (postId : string, details : IUserPostInfoVote) => { 
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
    trackPostByIdService: async (postId : string, details : IUserPostInfoTrack) => { 
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
    getUserService: async (id : string) : Promise<IUser[]> => {       
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
    getUsersService: async () : Promise<IUser[]> => {       
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
    getRandomAdvertsService: async (number : number) : Promise<IAdvert[]> => {
      const userInfo = getUserInfo();     
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + userInfo.token      
        }
      };           
      const response = await fetch(appConfig.backendURL + "/adverts/random/" + number, requestOptions)
      const data = await response.json()      
      return data;
    },
    getAuditByHoursService: async (hours: number, pageSize : number, pageNumber : number) : Promise<IAuditEvent[]> => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/audit/byhours/" + hours + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
    getAuditByUserService: async (userid: string, pageSize : number, pageNumber : number) : Promise<IAuditEvent[]> => { 
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/audit/byuser/" + userid + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
  },
  resolve(identifier : string) : any {
    if (!this.items.hasOwnProperty(identifier)) {
      throw new Error(`Object with identifier ${identifier} not found in container`);
    }        
    return this.items[identifier as keyof typeof container.items];
  }
};

function App() {
  const { token, setToken } = useToken();    

  // Login if no token
  if(!token) {
    console.log("Displaying Login page");
    return (
    <ContainerProvider container={container}> 
      <div className="App">        
        <Login setToken={setToken} />
      </div>
    </ContainerProvider>
    )
  }

  const dummyGroup = { ID: "1",
        Name: "",
        Description: "",
        Logo: ""
  };

  return (
  <ContainerProvider container={container}>          
    <div className="App">                   
        <NavBar />
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/auditevents" element={<AuditEvents />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/groups" element={<Groups />}/>
          <Route path="/groupinfo" element={<GroupInfo group={dummyGroup} />}/>                    
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
