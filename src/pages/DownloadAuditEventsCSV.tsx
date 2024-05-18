import { IAdvert, IAuditEvent, IDownloadCSVProps } from "../Interfaces";

// Download audit events CSV
// Params: None
const DownloadAuditEventsCSV = ({ items, file, delimiter } : IDownloadCSVProps<IAuditEvent>) => {
    const getCSVLine = (auditEvent : IAuditEvent, delimiter : string) : string => {
        const line = `${auditEvent.ID}${delimiter}${auditEvent.UserName}${delimiter}${auditEvent.CreatedDateTime}${delimiter}${auditEvent.EventTypeName}\n`;
        return line;
    };

    const downloadCSV = () => {        
        const lines: string[] = [];
        //const delimiter: string = "\t";
        items.forEach(function (auditEvent : IAuditEvent) {            
            lines.push(getCSVLine(auditEvent, delimiter));
        }); 

        // Create file object
        const blob = new Blob(lines, {type: 'text/plain'});        
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = file;
        // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <>            
            {items && items.length && <button onClick={downloadCSV}>Download</button> }           
        </>
    )
}

export default DownloadAuditEventsCSV