import { useState } from 'react';

// Implements delay for search to set find state after user stops typing
export default function useFindDelay(setFind : (search : string) => void, delay : number) { 
  const [ findInternalX, setFindInternal ] = useState<string>("");
  const [ timeout, setTimeoutValue ] = useState<NodeJS.Timeout>();  

    // Register function to perform delayed find after user stops typing
    /*
    let timeout : any = null;    
    const startDelayedFind = (search : string, delay : number) => {
        if (timeout != null) clearTimeout(timeout);
        setFindInternal(search);        
        timeout = setTimeout(function () {
            setFind(findInternal);
        }, delay);
    };
    */    

  const startDelayedFind = (search : string) => {
      if (timeout != null) {        
        console.log("startDelayedFind: Clearing timeout" + timeout);
        clearTimeout(timeout);
      }      
      setFindInternal(search);        

      var timeoutValue = setTimeout(function () {          
          console.log("Setting find to " + search);
          setFind(search);
      }, delay); 
      setTimeoutValue(timeoutValue);
  };    

  const stopDelayedFind = () =>
  {  
    if (timeout != null) clearTimeout(timeout);
  };

  return {
    setFindInternal: startDelayedFind,
    cancelFindInternal: stopDelayedFind,
    findInternal: findInternalX  
  }
}
