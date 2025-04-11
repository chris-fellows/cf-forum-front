import { IPost, INewRootPost } from "../Interfaces";
import { IRootPostsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class RootPostsService implements IRootPostsService {
    async GetRootPostsByPopularity(find : string,  pageSize : number, pageNumber : number) : Promise<IPost[]>
    {
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
    }

    async AddRootPost(post : INewRootPost) : Promise<IPost[]>
    {
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
    }

    async GetRootPostsByGroupService(id : string, find : string,  pageSize : number, pageNumber : number) : Promise<IPost[]>
    {
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
    }
}