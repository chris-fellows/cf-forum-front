import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import DownloadAdvertsCSV from "./DownloadAdvertsCSV";
import LoaderOverlay from "./LoaderOverlay";
import { IAdvert } from "../Interfaces";
import { getAdvertsServiceType } from "../Interfaces";
import LoginCheck from "./LoginCheck";
import SearchBar from "./SearchBar";

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
        
    return (
        <>
            <LoginCheck/>
            <div>Manage Adverts</div>     
            <LoaderOverlay loading={isLoading} message="Loading adverts..." />
            <DownloadAdvertsCSV items={adverts} file="Adverts.txt" delimiter="\t" />
            <SearchBar setFind={setFind} delay={1000} />            
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