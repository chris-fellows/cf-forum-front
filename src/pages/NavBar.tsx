import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import getUserInfo from '../userInfo';
import { useAuth } from '../authContext';

// Navigation bar
// Params: None
const NavBar = () => {
   const userInfo = getUserInfo();
   const { token } = useAuth();
   
   const navListStyle = {
      listStyle: "none"
   };

   const navListItemStyle = {
      display: "inline-block",
      marginRight: "10px"
    };    

 // TODO: Consider reading user_role_functions so that we can configure the nav bar from the DB
 const isAdmin = userInfo.role === "ADMIN";
 const isLoggedIn = userInfo.userName.length > 0;

 return (
   <nav>
         <ul style={navListStyle}>
            <li style={navListItemStyle}>
               <Link to="/">Home</Link>
            </li>
            {isLoggedIn && <li style={navListItemStyle}>
               <Link to="/groups">Groups</Link>
            </li>}
            {isLoggedIn && <li style={navListItemStyle}>
               <Link to="/userposts">My Posts</Link>
            </li>}
            <li style={navListItemStyle}>
               <Link to="/contact">Contact</Link>
            </li>
            {isLoggedIn && isAdmin && <li style={navListItemStyle}>
               <Link to="/users">Manage Users</Link>
            </li>}
            {isLoggedIn && isAdmin && <li style={navListItemStyle}>
               <Link to="/adverts">Manage Adverts</Link>
            </li>}
            {isLoggedIn && isAdmin && <li style={navListItemStyle}>
               <Link to="/auditevents">Audit Events</Link>
            </li>}   
            {isLoggedIn && <li style={navListItemStyle}>
               <Link to="/usersettings">My Settings</Link>
            </li>}   
            <li style={navListItemStyle}>
               <Link to="/help">Help</Link>
            </li>
            <li style={navListItemStyle}>
               <Link to="/about">About</Link>
            </li>

            <CurrentUser />
         </ul>            
   </nav>
 );
};

export default NavBar;