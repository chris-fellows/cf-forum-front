import { IGroup } from "../Interfaces";
import { IGroupsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class GroupsService implements IGroupsService {    
    async GetGroups(find : string) : Promise<IGroup[]>
    {
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
    }
        
    async GetGroup(id : string) : Promise<IGroup[]>
    {
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
    }
}