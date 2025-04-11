//import logo from './logo.svg';
//import './App.css';
import appConfig from './appConfig';
//import DITestComponent from './pages/DITestComponent.jsx';
//import { UserRoleService } from './services/UserRoleService.js';
import React, { createContext, useContext } from 'react';
import getUserInfo from './userInfo';
import { IAdvert, IAuditEvent, IGroup, INewPost, INewRootPost, IPage, IPost, IUser, IUserPostInfoVote, IUserCredentials, IUserPostInfoTrack, ILanguage, ITag } from './Interfaces';

export interface IMyContainer
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
export const ContainerProvider = ({ container, children } : ContainerProps) => {    
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

// Define container for dependencies
export const container = {    
  items: {    
    //userRoleService: new UserRoleService(),
    loginService: async (credentials : IUserCredentials) => {       
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
      };
      const response = await fetch(appConfig.backendURL + "/security/login", requestOptions)
      //console.log("Response:" + response.status + ":" + response.statusText);
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
    addUserForgotPasswordService: async (username : string) => {
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(username)
      };       
      const response = await fetch(appConfig.backendURL + "/users/forgotpassword", requestOptions)
      const data = await response.json()      
      return data;
    },

    getGroupsService: async (find : string) : Promise<IGroup[]> => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify({ find: find})
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
    getLanguagesService: async () : Promise<ILanguage[]> => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }        
      };                   
      const response = await fetch(appConfig.backendURL + "/languages", requestOptions)
      const data = await response.json()      
      return data;
    },
    getPagesService: async () : Promise<IPage[]> => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }        
      };                   
      const response = await fetch(appConfig.backendURL + "/pages", requestOptions)
      const data = await response.json()      
      return data;
    },
    getTagsService: async () : Promise<ITag[]> => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }        
      };                   
      const response = await fetch(appConfig.backendURL + "/tags", requestOptions)
      const data = await response.json()      
      return data;
    },
    addPostService: async (post : INewPost) : Promise<IPost[]> => {
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
    addRootPostService: async (post : INewRootPost) : Promise<IPost[]> => {      
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify(post)
      };       
      const response = await fetch(appConfig.backendURL + "/rootposts", requestOptions)      
      const data = await response.json()      
      console.log(data);      
      return data;
    },
    getRootPostsByGroupService: async (id : string, find : string,  pageSize : number, pageNumber : number) : Promise<IPost[]> => {  // GroupID
      const userInfo = getUserInfo();      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify({ find: find})
      };       
      const response = await fetch(appConfig.backendURL + "/rootposts/bygroup/" + id + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },
    getRootPostsByPopularityService: async (find : string,  pageSize : number, pageNumber : number) : Promise<IPost[]> => {
      const userInfo = getUserInfo();      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify({ find: find})
      };       
      const response = await fetch(appConfig.backendURL + "/rootposts/bypopularity?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
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
    getUsersService: async (find : string, pageSize : number, pageNumber : number) : Promise<IUser[]> => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify({ find: find})
      };       
      const response = await fetch(appConfig.backendURL + "/users" + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    },    
    getAdvertsService: async (find : string, pageSize : number, pageNumber : number) : Promise<IAdvert[]> => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        },
        body: JSON.stringify({ find: find})
      };       
      const response = await fetch(appConfig.backendURL + "/adverts" + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
      const data = await response.json()      
      return data;
    }, 
    getAdvertService: async (id : string) : Promise<IAdvert[]> => {       
      const userInfo = getUserInfo();
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + userInfo.token      
        }
      };       
      const response = await fetch(appConfig.backendURL + "/adverts/" + id, requestOptions)
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
