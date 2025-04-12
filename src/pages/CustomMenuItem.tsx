import { IMenuItem } from '../Interfaces';

interface ICustomMenuItemProps {
    menuItem: IMenuItem
    clickedAction: any
}

// Custom menu item
const CustomMenuItem = ( { menuItem, clickedAction } : ICustomMenuItemProps) => {    
    const handleMenuItemClick = async () => {                                           
        //window.alert("Menu item clicked: " + menuItem.Name);
        clickedAction();
    }

    if (menuItem.Logo && menuItem.Logo.length > 0)
    {
        return (
            <>
                <div>
                    <img src={menuItem.Logo} alt="Logo" width={20} height={20} />
                    <button className="CustomMenuButton" onClick={(e) => handleMenuItemClick()}>{ menuItem.Name }</button>
                </div>
            </>
        )
    }

    return (
        <>                    
            <button className="CustomMenuButton" onClick={(e) => handleMenuItemClick()}>{ menuItem.Name }</button>
        </>
    )
}

export default CustomMenuItem