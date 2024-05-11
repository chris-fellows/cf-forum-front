//import logo from './logo.svg';
import './App.css';
import appConfig from './appConfig';
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import DITestComponent from './pages/DITestComponent.jsx';
//import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import About from './pages/About'
import AuditEvents from './pages/AuditEvents';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Home from './pages/Home';
import GroupRootPosts from './pages/GroupRootPosts';
import GroupInfo from './pages/GroupInfo';
import Groups from "./pages/Groups"
import Login from './pages/Login';
import NavBar from './pages/NavBar';
import ThreadPosts from './pages/ThreadPosts';
import User from './pages/User';
import UserPosts from './pages/UserPosts';
import UserRegistration from './pages/UserRegistration';
import UserSettings from './pages/UserSettings';
import Users from './pages/Users';
import { ContainerProvider, container } from './containerContext';

function App() {    
  // Don't prompt for login, let user click Login button
  /*
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
  */

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
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/threadposts" element={<ThreadPosts />}/> 
            <Route path="/userdetails" element={<User />}/> 
            <Route path="/userposts" element={<UserPosts />}/>     
            <Route path="/useregistration" element={<UserRegistration />}/>          
            <Route path="/usersettings" element={<UserSettings />}/>
            <Route path="/users" element={<Users />}/>           
          </Routes>                          
      </div>    
    </ContainerProvider>
  );
}

export default App;
