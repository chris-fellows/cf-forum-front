import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import DownloadItemsCSV from "./DownloadItemsCSV";
import LoaderOverlay from "./LoaderOverlay";
import { IAdvert } from "../Interfaces";
import { getAdvertsServiceType } from "../Interfaces";
import LoginCheck from "./LoginCheck";
import SearchBar from "./SearchBar";
import appConfig from "../appConfig";

// Displays adverts. Allows edit of advert.
// Params: None
const Adverts = () => {
    const [adverts, setAdverts] = useState<IAdvert[]>([])   
    const [find, setFind] = useState<string>("");    
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const getAdvertsService = useInject2<getAdvertsServiceType>('getAdvertsService');  
    const activeQueries = useRef<number>(0);

    useEffect(() => {
        const fetchAdverts = async () => {            
            const data = await getAdvertsService(find, 1000000, 1);         
            setAdverts(data);
            activeQueries.current--;
            if (activeQueries.current == 0) setIsLoading(false);
        }

        activeQueries.current = 1;
        setIsLoading(true);
        fetchAdverts();
    }, [find]);       

    // Set function for export CSV
    const getCSVLine = (advert : IAdvert, delimiter : string) : string => {
        const line = `${advert.ID}${delimiter}${advert.Name}${delimiter}${advert.FromDateTime}${delimiter}${advert.ToDateTime}${delimiter}${advert.Logo}${delimiter}${advert.LogoType}${delimiter}${advert.External}\n`;
        return line;
    };
            
    return (
        <>
            <LoginCheck/>
            <div>Manage Adverts</div>     
            <LoaderOverlay loading={isLoading} message="Loading adverts..." />          
            <SearchBar setFind={setFind} delay={appConfig.searchDelay} /><br/>
            <DownloadItemsCSV title="Download" 
                    columns={["ID", "Name", "From", "To", "Logo", "Logo_Type", "External"]} 
                    items={adverts} 
                    file= { "Adverts" + appConfig.downloadCSVExtension }
                    delimiter={appConfig.downloadCSVDelimiter}
                    getLine={getCSVLine} />
            <table className="AdvertsTable">
                <thead>
                    <tr>
                        <th className="AdvertsTableCell">Name</th>
                        <th className="AdvertsTableCell">From</th>
                        <th className="AdvertsTableCell">To</th>
                        <th className="AdvertsTableCell"></th>
                        <th className="AdvertsTableCell"></th>
                    </tr>
                </thead>
                <tbody>
                    {adverts.map(advert => 
                        <tr key={advert.ID}>
                            <td className="AdvertsTableCell">{advert.Name}</td>                            
                            <td className="AdvertsTableCell">{advert.FromDateTime}</td>                            
                            <td className="AdvertsTableCell">{advert.ToDateTime}</td>      
                            <td className="UsersTableCell"><Link to={"/advertedit?advertid=" + advert.ID }>Edit</Link></td>                      
                            <td className="AdvertsTableCell"><Link to={ advert.External } target="_blank">Open</Link></td>                            
                        </tr>
                    )}            
                </tbody>
            </table>
        </>
    )          
}

export default Adverts