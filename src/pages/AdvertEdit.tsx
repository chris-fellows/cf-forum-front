import { useState, useEffect } from "react"
import { useInject2 } from "../useInject";
import { useSearchParams } from 'react-router-dom';
import LoginCheck from "./LoginCheck";
import { IAdvert } from "../Interfaces";
import { IAdvertsService } from "../serviceInterfaces";

// Advert edit
// Params: AdvertId
const AdvertEdit = ({advertId} : any) => {    
    //const userInfo = getUserInfo();
    //const [advert, setAdvert] = useState<IAdvert>();
    const [name, setName] = useState<string>("");    
    const [fromDateTime, setFromDateTime] = useState<string>("");  
    const [toDateTime, setToDateTime] = useState<string>("");  
    const [logoType, setLogoType] = useState<number>(0);  
    const [logo, setLogo] = useState<string>("");  
    const [external, setExternal] = useState<string>("");      

    const advertsService = useInject2<IAdvertsService>('advertsService');      

    // Get user (Either passed userId, from querystring or default)    
    const [searchParams] = useSearchParams();
    var theAdvertId = advertId;   // Default to passed value
    if (theAdvertId == undefined) {   // Check query string        
        theAdvertId = searchParams.get("advertid")!; 
    }      

  useEffect(() => {       
      // Get advert
      const fetchAdvert = async () => {            
          console.log("User: Getting user details");
          const data = await advertsService.GetAdvert(theAdvertId)          
          //setAdvert(data[0]);
          setName(data[0].Name);
          setFromDateTime(data[0].FromDateTime);
          setToDateTime(data[0].ToDateTime);
          setLogoType(data[0].LogoType);
          setLogo(data[0].Logo);
          setExternal(data[0].External);
          console.log(data);            
      }

      fetchAdvert();        
  }, []);   
    
    return (
        <>
            <LoginCheck/>
            <div>Advert Edit</div>     
            <ul style={ { listStyleType: "none" } }>
            <li>
                <label htmlFor={"advertname"}>Name:</label><input type="text" id={"advertname"} value={name} onChange={event => setName(event.target.value)} />
            </li>
            <li>
                <label htmlFor={"advertfromdatetime"}>From:</label><input type="text" id={"advertfromdatetime"} value={fromDateTime} onChange={event => setFromDateTime(event.target.value)} />
            </li>
            <li>
                <label htmlFor={"adverttodatetime"}>To:</label><input type="text" id={"adverttodatetime"} value={toDateTime} onChange={event => setToDateTime(event.target.value)} />
            </li>
            <li>
                <label htmlFor={"advertlogotype"}>Logo Type:</label><input type="number" id= {"advertlogotype"} value={logoType} onChange={event => setLogoType(Number(event.target.value))} />        
            </li>
            <li>
                <label htmlFor={"advertlogo"}>Logo:</label><input type="text" id= {"advertlogo"} value={logo} onChange={event => setLogo(event.target.value)} />        
            </li>
            <li>
                <label htmlFor={"advertexternal"}>External:</label><input type="text" id= {"advertexternal"} value={external} onChange={event => setExternal(event.target.value)} />        
            </li>            
        </ul>       
        </>
    )
}

export default AdvertEdit
