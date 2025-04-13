import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useInject2 } from "../useInject";
import LoaderOverlay from "./LoaderOverlay";
import { ILanguage } from "../Interfaces";
import { ILanguagesService } from "../serviceInterfaces";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoginCheck from "./LoginCheck";
import appConfig from "../appConfig";
import LanguageInfo from "./LanguageInfo";

// Users information
// Params: None
const Languages = () => {
    const [languages, setLanguages] = useState<ILanguage[]>([])            
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const activeQueries = useRef<number>(0);
    const languagesService = useInject2<ILanguagesService>('languagesService');      

    const navigate = useNavigate()

    useEffect(() => {        
        const fetchLanguages = async () => {            
            const data = await languagesService.GetLanguages();
            setLanguages(data);
            activeQueries.current--;            
            if (activeQueries.current == 0) setIsLoading(false);            
        }
        
        activeQueries.current = 1;        
        setIsLoading(true);
        fetchLanguages();        
    }, []);  
    
    // Set function for export CSV
    const getCSVLine = (language : ILanguage, delimiter : string) : string => {
        const line = `${language.ID}${delimiter}${language.Name}${delimiter}${language.Code}\n`;
        return line;
    };
            
    // <label htmlFor={"userfind"}>Search:</label><input type="text" id={"userfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />            
    return (
        <>
            <LoginCheck/>
            <div>Manage Languages</div>             
            <LoaderOverlay loading={isLoading} message="Loading languages..."/>                       
            <DownloadItemsCSV title="Download"
                    columns={["ID", "Name", "Code"]} 
                    items={languages} 
                    file= { "Languages" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                    getLine={getCSVLine} />
            <table className="LanguagesTable">
                <thead>
                    <tr>
                        <th className="LanguagesTableCell">Name</th>
                        <th className="LanguagesTableCell">Code</th>                                   
                    </tr>
                </thead>
                <tbody>
                    {languages.map(language => 
                        <tr key={language.ID}>                            
                            <td className="LanguagesTableCell"><LanguageInfo name={language.Name} logo={language.Logo}/></td>                            
                            <td className="LanguagesTableCell">{language.Code}</td>                             
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Languages