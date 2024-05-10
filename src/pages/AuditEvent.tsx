import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import getUserInfo from '../userInfo';
import { IAuditEvent } from "../Interfaces";

interface IAuditEventProps {
    auditEvent: IAuditEvent
}

// Audit event details
// Params: Audit event
const AuditEvent = ({ auditEvent } : IAuditEventProps) => {   
   const userInfo = getUserInfo();    
   //console.log("AuditEvent: ID=" + auditEvent.ID);

   // TODO: Format display of Data property. Consider adding links to other pages to view the 
   // entity (E.g. If data contains PostID then add link for post)
   return(
        <tr>
            <td>{auditEvent.ID}</td>           
            <td>{auditEvent.CreatedDateTime}</td> 
            <td>{auditEvent.EventTypeName}</td>            
            <td>{auditEvent.UserName}</td>
            <td>{auditEvent.Data}</td>
        </tr>
   )

};

export default AuditEvent;