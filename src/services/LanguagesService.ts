import { ILanguage } from "../Interfaces";
import { ILanguagesService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class LanguagesService implements ILanguagesService {    
    async GetLanguagesService() : Promise<ILanguage[]>
    {
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
    }
}