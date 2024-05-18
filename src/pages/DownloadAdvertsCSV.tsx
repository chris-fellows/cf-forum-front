import { IDownloadCSVProps, IAdvert } from "../Interfaces";

// Download adverts CSV
// Params: None
const DownloadAdvertsCSV = ({ items, file, delimiter } : IDownloadCSVProps<IAdvert>) => {
    const getCSVLine = (advert : IAdvert, delimiter : string) : string => {
        const line = `${advert.ID}${delimiter}${advert.Name}${delimiter}${advert.FromDateTime}${delimiter}${advert.ToDateTime}${delimiter}${advert.Logo}${delimiter}${advert.LogoType}${delimiter}${advert.External}\n`;
        return line;
    };

    const downloadCSV = () => {        
        const lines: string[] = [];
        //const delimiter: string = "\t";
        items.forEach(function (advert : IAdvert) {            
            lines.push(getCSVLine(advert, delimiter));
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

export default DownloadAdvertsCSV