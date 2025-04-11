import PopupMenu from "./PopupMenu";
import getUserInfo from '../userInfo';
import { useState } from "react"
import { IMenuItem } from '../Interfaces';

// Params: None
const PopupMenuTest = () => {
    const userInfo = getUserInfo();
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

    let isVisible : boolean = false;
     
    let menuItems : IMenuItem[] =  [
            {
                ID: "MI1",
                Name: "Menu item 1"
            },
            {
                ID: "MI2",
                Name: "Menu item 2"
            },
            {
                ID: "MI3",
                Name: "Menu item 3"
            }
        ];    
          
    const handleClickMeClick = async () => {                                           
        setPopupVisible(!isPopupVisible);
    }

    const handleMenuItemClicked = async (menuItem: IMenuItem) =>
    {
        window.alert("Home:" + menuItem.Name);
    }    
   
    return (
        <>            
            <div className="PopupContainer">
                <button onClick={(e) => handleClickMeClick()}>Click me</button>
                {isPopupVisible && <PopupMenu menuItems={menuItems} menuItemClicked={handleMenuItemClicked} />}
            </div>          
        </>
    )
}

export default PopupMenuTest