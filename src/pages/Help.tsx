import { useState } from "react"
import { useNavigate } from "react-router-dom";

// Help information
// Params: None
const Help = () => {    
    const [itemUrl, setItemUrl] = useState<string>("");
    
    // List of help articles
    const items =  [ 
                { display : "Terms of Service", url: "help/termsofservice.html" },
                { display: "Troubleshooting", url: "help/troubleshooting.html" },                          
            ];
               
    return (
        <>
            <div>Help</div>              
            <ul style={ { listStyleType: "none" } }>
                {items.map(item =>
                    <li>
                        <a href={item.url} onClick={() => setItemUrl(item.url)}>{item.display}</a>
                    </li>
                )}
            </ul>
            <iframe width="860" height="484" src={itemUrl}/>
        </>
    )
}

export default Help