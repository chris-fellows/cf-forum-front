import { IDownloadCSVProps, IPost } from "../Interfaces";

// Download posts CSV
// Params: None
const DownloadPostsCSV = ({ items, file, delimiter } : IDownloadCSVProps<IPost>) => {
    const getCSVLine = (post : IPost, delimiter : string) : string => {
        const line = `${post.ID}${delimiter}${post.GroupID}${delimiter}${post.CreatedDateTime}${delimiter}${post.UserName}${delimiter}${post.Text}\n`;
        return line;
    };

    const downloadCSV = () => {        
        const lines: string[] = [];
        //const delimiter: string = "\t";
        items.forEach(function (user : IPost) {            
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

export default DownloadPostsCSV