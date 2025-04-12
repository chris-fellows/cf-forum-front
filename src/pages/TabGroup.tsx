import { Children } from "react"
import { useRef, useState } from "react"
import TabItem from "./TabItem"
import { stringify } from "querystring"

interface ITabGroupProps {
    children : React.ReactNode
}


// Custom menu
const TabGroup = ( { children } : ITabGroupProps ) => {                  
   const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

   console.log("Rending TabGroup: " + selectedTabIndex);

   //const getTabButtonClassName = (index : number) : string =>
   //{
   //     return (index == selectedTabIndex) ? "TabButtonSelected" : "TabButtonUnselected";        
   //}

   const getTabItemClassName = (index : number) : string =>
    {
         return (index == selectedTabIndex) ? "TabItemSelected" : "TabItemUnselected";         
    }     

    // Set tab item click handler
    const handleTabItemClick = async (index : number) => {                         
        console.log("handleTabItemClick=" + index);
        setSelectedTabIndex(index);
    }    

    return (
        <>  
            <div className="TabDiv">
                <div>
                    {Children.map(children, (child, index) =>                             
                            <button type="button" onClick={ () => handleTabItemClick(index) } > { (Children.toArray(children)[index] as React.ReactElement).props.name } </button>                                                                            
                        )
                    }
                </div>            
            
                {Children.map(children, (child, index) =>                                                         
                        <div className={ getTabItemClassName(index) }>{child}</div>                                 
                )}      
            </div>
        </>
    )
}

export default TabGroup