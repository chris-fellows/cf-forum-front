import { IMenuItem, IPopupMenuFactoryService } from "../Interfaces";

// Password service for validating passwords
export class PopupMenuFactoryService implements IPopupMenuFactoryService {
    GetTestMenuItems() : IMenuItem[]
    {          
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

        return menuItems;
    }
}