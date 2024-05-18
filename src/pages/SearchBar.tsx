import { useState } from "react";
import { ISearchBarProps } from "../Interfaces";

// Search bar. User enters text and setFind is called after delay when user has stopped typing
// Params: setFind method to call / Delay to wait
const SearchBar = ({ setFind, delay } : ISearchBarProps) => {
    const [ findInternalX, setFindInternal ] = useState<string>("");
    const [ timeout, setTimeoutValue ] = useState<NodeJS.Timeout>();      

    // Set function to store search text and fire timer when typing stops
    const storeFind = (find : string) => {
        if (timeout != null) {          
          clearTimeout(timeout);
        }      
        setFindInternal(find);        
  
        var timeoutValue = setTimeout(function () {          
            //console.log("Setting find to " + search);
            setFind(find);
        }, delay); 
        setTimeoutValue(timeoutValue);
    };    
    
    return (
        <>           
            <label htmlFor={"findInput"}>Search:</label>
            <input type="text" id={"findInput"} value={findInternalX} onChange={event => storeFind(event.target.value)} />            
        </>
    )
}

export default SearchBar