import { INewPost, IPost, IUserPostInfoVote, IUserPostInfoTrack } from "../Interfaces";
import { IPostsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class PostsService implements IPostsService {          
    async AddPost(post : INewPost) : Promise<IPost[]>
    {
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
    }

    async GetPostsByRootPost(postId : string, pageSize : number, pageNumber : number) : Promise<IPost[]>
    {
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
    }

    async GetPostsByUser(userid : string, pageSize : number, pageNumber : number) : Promise<IPost[]>
    {
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
    }

    async DeletePostById(postId : string)
    {
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
    }

    async UpdatePostById(postId : string, details : any)
    {
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
    }

    async VotePostById(postId : string, details : IUserPostInfoVote)
    {
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
    }

    async TrackPostById(postId : string, details : IUserPostInfoTrack)
    {
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
    }
}