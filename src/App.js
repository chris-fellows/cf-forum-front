import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Groups from "./pages/Groups.jsx"
//import Group from "./pages/GroupInfo.jsx"
import DITestComponent from './pages/DITestComponent.jsx';
import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import { useInject, useContainer } from './DependencyInjection.js';

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

// Define a hook to access the container from within a component
//const useContainer = () => {
//  const container = useContext(ContainerContext);
//  if (!container) {
//    throw new Error('Container not found. Make sure to wrap your components with a ContainerProvider.');
//  }
//  return container;
//};

// Define a hook to inject dependencies from the container
//const useInject = (identifier) => {
//  const container = useContainer();
//  return container.resolve(identifier);
//};


// Test service
const MyService = () => {
  return { foo: 'bar' };
};

const MyAppConfigService =() => {
  return { 
          backendURL: "http://localhost:8880",
           //backendURL: process.env.BACKEND_URL,
           message: "Hello from MyAppConfigService" 
        };
}

// Test component
//const DITestComponent = () => {
//  const myService = useInject('myService');
//  const myAppConfigService = useInject('myAppConfigService')
//  return <div>{myService.foo} AppConfigService: {myAppConfigService.message} </div>; // Output: 'bar'
//};

// getGroupsService: () => { return fetch("http://localhost:8800/groups").json(); }
// Define contain for dependencies
const container = {
  items: {
    myService: MyService(),
    myAppConfigService: MyAppConfigService(),
    userRoleService: new UserRoleService(),
    getGroupsService: async () => {       
      const response = await fetch("http://localhost:8800/groups")
      const data = await response.json()      
      return data;
    },
    getGroupService: async (id) => {       
      const response = await fetch("http://localhost:8800/groups/" + id)
      const data = await response.json()      
      return data;
    },
    getUserService: async (id) => {       
      const response = await fetch("http://localhost:8800/users/" + id)
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

//<Route path="/" element={<Groups/>}/>
//          <Route path="/group" element={<Group/>}/>

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>                  
        </Routes>
      </BrowserRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <ContainerProvider container={container}>          
          <Groups />
          <DITestComponent />
        </ContainerProvider>
      </header>
    </div>
  );
}

export default App;
