import { IUser } from "../Interfaces";
import { IUsersService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class UsersService implements IUsersService {      
    async GetUsers(find : string, pageSize : number, pageNumber : number) : Promise<IUser[]>
    {
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
    }
    
    async GetUser(id : string) : Promise<IUser[]>
    {
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
    }

    async AddUserForgotPassword(username : string)
    {
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
    }
}