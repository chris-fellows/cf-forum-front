import { IMenuItem } from '../Interfaces';

interface IPopupMenuProps {    
    menuItemClicked: (menuItem: IMenuItem) => void;
    menuItems: IMenuItem[]
}

// Popup menu
const PopupMenu = ( { menuItems, menuItemClicked } : IPopupMenuProps) => {    

    const handleMenuItemClick = async (menuItem : IMenuItem) => {                                           
        menuItemClicked(menuItem);        
    }
    
    return (
        <>            
            <div className="PopupMenuDiv">
            <ul className="PopupMenuList" style={{ listStyleType: "none" }}>
                { menuItems.map(menuItem => 
                    <li>
                        <button className="PopupMenuButton" onClick={(e) => handleMenuItemClick(menuItem)}>menuItem.Name</button>
                    </li>) 
                }
            </ul>
           </div>
        </>
    )
}

export default PopupMenu