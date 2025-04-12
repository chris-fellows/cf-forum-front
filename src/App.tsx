//import logo from './logo.svg';
import './App.css';
import appConfig from './appConfig';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useContext } from 'react';
import About from './pages/About'
import Adverts from './pages/Adverts';
import AuditEvents from './pages/AuditEvents';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Home from './pages/Home';
import GroupRootPosts from './pages/GroupRootPosts';
import GroupInfo from './pages/GroupInfo';
import Groups from "./pages/Groups"
import Login from './pages/Login';
import NavBar from './pages/NavBar';
import Privacy  from './pages/Privacy';
import SiteMaintenance from './pages/SiteMaintenance';
import TabTest from './pages/TabTest';
import ThreadPosts from './pages/ThreadPosts';
import UserEdit from './pages/UserEdit';
import UserForgotPassword from './pages/UserForgotPassword';
import UserForgotPasswordSent from './pages/UserForgotPasswordSent';
import UserPosts from './pages/UserPosts';
import UserRegistration from './pages/UserRegistration';
import UserResetPassword from './pages/UserResetPassword';
import UserSettings from './pages/UserSettings';
import Users from './pages/Users';
import { ContainerProvider, container } from './containerContext';
import AdvertEdit from './pages/AdvertEdit';
import NewRootPost from './pages/NewRootPost';
import CustomMenuTest from './pages/CustomMenuTest';

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
            <Route path="/addrootpost" element={<NewRootPost />}/>
            <Route path="/adverts" element={<Adverts />}/>
            <Route path="/advertedit" element={<AdvertEdit />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/auditevents" element={<AuditEvents />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/custommenutest" element={<CustomMenuTest />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/groups" element={<Groups />}/>
            <Route path="/groupinfo" element={<GroupInfo group={dummyGroup} />}/>                    
            <Route path="/grouprootposts" element={<GroupRootPosts />}/>          
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/privacy" element={<Privacy />}/>
            <Route path="/sitemaintenance" element={<SiteMaintenance />}/>
            <Route path="/tabtest" element={<TabTest />}/> 
            <Route path="/threadposts" element={<ThreadPosts />}/> 
            <Route path="/useredit" element={<UserEdit />}/> 
            <Route path="/userforgotpassword" element={<UserForgotPassword />}/> 
            <Route path="/userforgotpasswordsent" element={<UserForgotPasswordSent />}/> 
            <Route path="/userposts" element={<UserPosts />}/>     
            <Route path="/userregistration" element={<UserRegistration />}/>                      
            <Route path="/userresetpassword" element={<UserResetPassword />}/>                      
            <Route path="/usersettings" element={<UserSettings />}/>
            <Route path="/users" element={<Users />}/>           
          </Routes>                          
      </div>    
    </ContainerProvider>
  );
}

export default App;
