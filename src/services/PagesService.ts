import { IPage } from "../Interfaces";
import { IPagesService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class PagesService implements IPagesService {      
    async GetPages() : Promise<IPage[]>
    {
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
    }
}