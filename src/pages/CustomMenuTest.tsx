import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';
import getUserInfo from '../userInfo';
import { useState } from "react"

// Params: None
const CustomMenuTest = () => {
    const userInfo = getUserInfo();
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  
    const handleClickMeClick = async () => {                                           
        setPopupVisible(!isPopupVisible);
    }
   
    const handleMenuItem1Clicked = async() =>
    {
        window.alert("Menu item 1 clicked");
        setPopupVisible(false);
    }

    const handleMenuItem2Clicked = async() =>
    {
        window.alert("Menu item 2 clicked");
        setPopupVisible(false);
    }

    const handleMenuItem3Clicked = async() =>
    {
        window.alert("Menu item 3 clicked");
        setPopupVisible(false);
    }

    return (
        <>            
            <div className="PopupContainer">
                <button onClick={(e) => handleClickMeClick()}>Click me (Menu: Image & Text)</button>
                {isPopupVisible && 
                    <CustomMenu>
                        <CustomMenuItem menuItem={ { ID: "1", Name: "Menu item 1", Logo: "https://picsum.photos/50" }} clickedAction={ handleMenuItem1Clicked }/>                                                         
                        <CustomMenuItem menuItem={ { ID: "2", Name: "Menu item 2", Logo: "https://picsum.photos/50" }} clickedAction={ handleMenuItem2Clicked }/>
                        <CustomMenuItem menuItem={ { ID: "3", Name: "Menu item 3", Logo: "https://picsum.photos/50" }} clickedAction={ handleMenuItem3Clicked }/>                     
                    </CustomMenu>
                }
            </div>     

            <div className="PopupContainer">
                <button onClick={(e) => handleClickMeClick()}>Click me (Menu: Text only)</button>
                {isPopupVisible && 
                    <CustomMenu>
                        <CustomMenuItem menuItem={ { ID: "1", Name: "Menu item 1", Logo: "" }} clickedAction={ handleMenuItem1Clicked }/>                                                         
                        <CustomMenuItem menuItem={ { ID: "2", Name: "Menu item 2", Logo: "" }} clickedAction={ handleMenuItem2Clicked }/>
                        <CustomMenuItem menuItem={ { ID: "3", Name: "Menu item 3", Logo: "" }} clickedAction={ handleMenuItem3Clicked }/>                     
                    </CustomMenu>
                }
            </div>         
        </>
    )
}

export default CustomMenuTest