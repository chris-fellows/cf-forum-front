import { Link } from 'react-router-dom';

// Navigation bar
// Params: None
const NavBar = () => {

   const navListStyle = {
      listStyle: "none"
   };

   const navListItemStyle = {
      display: "inline-block",
      marginRight: "10px"
    };

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
             <Link to="/about">About</Link>
          </li>
          <li style={navListItemStyle}>
             <Link to="/contact">Contact</Link>
          </li>
          <li style={navListItemStyle}>
             <Link to="/users">Manage Users</Link>
          </li>
          <li style={navListItemStyle}>
             <Link to="/help">Help</Link>
          </li>
       </ul>
 </nav>
 );
};

export default NavBar;