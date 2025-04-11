import { IAdvert } from "../Interfaces";
import { IAdvertsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class AdvertsService implements IAdvertsService {        
    async GetAdverts(find : string, pageSize : number, pageNumber : number) : Promise<IAdvert[]>
    {
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
    }

    async GetAdvert(id : string) : Promise<IAdvert[]>
    {
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
    }

    async GetRandomAdvertsService(number : number) : Promise<IAdvert[]>
    {
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
    }
}