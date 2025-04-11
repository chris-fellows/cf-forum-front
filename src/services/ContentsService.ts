import { IContent } from "../Interfaces";
import { IContentsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class ContentsService implements IContentsService {    
    async GetContentByName(name : string) : Promise<IContent[]>
    {
          const userInfo = getUserInfo();
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
                'Authorization': 'Bearer ' + userInfo.token      
            },
            body: JSON.stringify( { name: name })
          };       
          const response = await fetch(appConfig.backendURL + "/contents/byname", requestOptions)
          const data = await response.json()      
          return data;
    }
}