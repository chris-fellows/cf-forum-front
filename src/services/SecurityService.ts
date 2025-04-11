import { IUserCredentials } from "../Interfaces";
import { ISecurityService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class SecurityService implements ISecurityService {      
    async Login(credentials : IUserCredentials) : Promise<any>
    {   
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
      };
      const response = await fetch(appConfig.backendURL + "/security/login", requestOptions)
      //console.log("Response:" + response.status + ":" + response.statusText);
      const data = await response.json()            
      return data;        
    }

    async Logout() : Promise<any>
    {
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
    }
}