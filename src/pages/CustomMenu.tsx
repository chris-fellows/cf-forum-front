import { Children } from "react"

interface ICustomMenuProps {
    children : React.ReactNode 
}

// Custom menu
const CustomMenu = ( { children } : ICustomMenuProps ) => {    
    return (
        <>            
            <div className="CustomMenuDiv">
                <ul className="CustomMenuList" style={{ listStyleType: "none" }}>
                    {Children.map(children, child =>
                        <li>
                            {child}       
                        </li>                    
                    )}
                </ul>
           </div>
        </>
    )
}

export default CustomMenu