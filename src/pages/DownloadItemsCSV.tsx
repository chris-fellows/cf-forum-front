import { useState } from "react"
import { IDownloadCSVProps } from "../Interfaces";
import LoaderOverlay from "./LoaderOverlay";

// Download CSV of items
// Params: Link title, columns, items, file, delimiter, function to format item as CSV line
const DownloadItemsCSV = <T,>({ title, columns, items, file, delimiter, getLine } : IDownloadCSVProps<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);     

    const download = () => {
        setIsLoading(true);
        const lines: string[] = []; 

        // Add columns
        let header : string = "";
        columns.forEach(function (column: string) {
            if (header.length > 0) header += delimiter;
            header += column;
        });        
        lines.push(header + "\n");
        
        // Add items
        items.forEach(function (item : T) {                    
            lines.push(getLine(item, delimiter));
        }); 

        // Create file object
        const data = new Blob(lines, {type: 'text/plain'});        
        const element = document.createElement("a");
        element.href = URL.createObjectURL(data);
        element.download = file;        
        document.body.appendChild(element); // For FireFox
        element.click();

        setIsLoading(false);
    };

    return (
        <>         
            <LoaderOverlay loading={isLoading} message="Downloading..." />   
            {items && items.length && <button onClick={() => download()}>{title}</button> }      
        </>
    )
}

export default DownloadItemsCSV