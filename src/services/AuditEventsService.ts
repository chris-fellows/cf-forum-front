import { IAuditEvent } from "../Interfaces";
import { IAuditEventsService } from "../serviceInterfaces";
import appConfig from "../appConfig";
import getUserInfo from "../userInfo";

// Password service for validating passwords
export class AuditEventsService implements IAuditEventsService {          
    async GetAuditByHoursService(hours: number, pageSize : number, pageNumber : number) : Promise<IAuditEvent[]>
    {
        const userInfo = getUserInfo();
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + userInfo.token      
          }
        };       
        const response = await fetch(appConfig.backendURL + "/audit/byhours/" + hours + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
        const data = await response.json()      
        return data;
    }

    async GetAuditByUserService(userid: string, pageSize : number, pageNumber : number) : Promise<IAuditEvent[]>
    {
        const userInfo = getUserInfo();
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + userInfo.token      
          }
        };       
        const response = await fetch(appConfig.backendURL + "/audit/byuser/" + userid + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber, requestOptions)
        const data = await response.json()      
        return data;
    }
}