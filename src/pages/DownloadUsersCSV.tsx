import { IDownloadCSVProps, IUser } from "../Interfaces";

// Download users CSV
// Params: None
const DownloadUsersCSV = ({ items, file, delimiter } : IDownloadCSVProps<IUser>) => {
    const getCSVLine = (user : IUser, delimiter : string) : string => {
        const line = `${user.ID}${delimiter}${user.Email}${delimiter}${user.Name}${delimiter}${user.UserRoleName}\n`;
        return line;
    };

    const downloadCSV = () => {        
        const lines: string[] = [];
        //const delimiter: string = "\t";
        items.forEach(function (user : IUser) {            
            lines.push(getCSVLine(user, delimiter));
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

export default DownloadUsersCSV