import { useState, useEffect, useRef } from "react"
import { useInject, useInject2 } from "../DependencyInjection";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { IAdvert } from "../Interfaces";
import getUserInfo from "../userInfo";
import { getAdvertsServiceType } from "../Interfaces";
import LoginCheck from "./LoginCheck";
import useFindDelay from "../useFindDelay";

// Displays adverts. Allows edit of advert.
// Params: None
const Adverts = () => {
    const [adverts, setAdverts] = useState<IAdvert[]>([])   
    const [find, setFind] = useState<string>("");
    const { findInternal, setFindInternal } = useFindDelay(setFind, 1000);     
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

    if (isLoading && getUserInfo().userName.length) {
        return <Loading />;
    }
        
    return (
        <>
            <LoginCheck/>
            <div>Manage Adverts</div>     
            <label htmlFor={"advertfind"}>Search:</label><input type="text" id={"advertfind"} value={findInternal} onChange={event => setFindInternal(event.target.value)} />                 
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