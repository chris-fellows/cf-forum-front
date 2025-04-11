import { ITag } from "../Interfaces";
import { ITagsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class TagsService implements ITagsService {      
    async GetTags() : Promise<ITag[]>
    {
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
    }
}