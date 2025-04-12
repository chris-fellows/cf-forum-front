import { IMenuItem } from "../Interfaces";
import { IPopupMenuFactoryService } from "../serviceInterfaces";

// Password service for validating passwords
export class PopupMenuFactoryService implements IPopupMenuFactoryService {
    GetTestMenuItems() : IMenuItem[]
    {          
        let menuItems : IMenuItem[] =  [
            {
                ID: "MI1",
                Name: "Menu item 1",
                Logo: ""
            },
            {
                ID: "MI2",
                Name: "Menu item 2",
                Logo: ""
            },
            {
                ID: "MI3",
                Name: "Menu item 3",
                Logo: ""
            }
        ];    

        return menuItems;
    }
}