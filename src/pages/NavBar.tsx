import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import getUserInfo from '../userInfo';

// Navigation bar
// Params: None
const NavBar = () => {
   const userInfo = getUserInfo();

   const navListStyle = {
      listStyle: "none"
   };

   const navListItemStyle = {
      display: "inline-block",
      marginRight: "10px"
    };    

 const isAdmin = userInfo.role === "admin";

 return (
 <nav>
       <ul style={navListStyle}>
          <li style={navListItemStyle}>
             <Link to="/">Home</Link>
          </li>
          <li style={navListItemStyle}>
             <Link to="/groups">Groups</Link>
          </li>
          <li style={navListItemStyle}>
             <Link to="/userposts">My Posts</Link>
          </li>          
          <li style={navListItemStyle}>
             <Link to="/contact">Contact</Link>
          </li>
          {isAdmin && <li style={navListItemStyle}>
             <Link to="/users">Manage Users</Link>
          </li>}
          {isAdmin && <li style={navListItemStyle}>
             <Link to="/auditevents">Audit Events</Link>
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