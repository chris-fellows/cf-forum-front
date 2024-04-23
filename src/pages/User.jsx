import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useInject } from "../DependencyInjection";
import getUserInfo from '../userInfo';

// Displays user, allows edit
// Params: UserId
const User = ({userId}) => {
    const userInfo = getUserInfo();
    const [user, setUser] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    //const [theUserId, setTheUserId] = useState(0);
    const getUserService = useInject('getUserService');      

      // Get user (Either passed userId, from querystring or default)
      let userDefault = "param";
      const [searchParams] = useSearchParams();
      let theUserId = userId;   // Default to passed value
      if (theUserId == undefined) {   // Check query string        
          theUserId = searchParams.get("userid");        
          if (theUserId == undefined) {    // Current user
              theUserId = userInfo.userId;
              userDefault = "current";
          } else {
              userDefault = "query";
          }

      }    

    console.log("Entered User" + userDefault + ":" + theUserId);

    useEffect(() => {       
        // Get root posts
        const fetchUser = async () => {            
            console.log("User: Getting user details");
            const data = await getUserService(theUserId)
            setUser(data[0]);
            setName(data[0].Name);
            setEmail(data[0].Email);
            console.log(data);            
        }

        // Get adverts
        //const fetchRandomAdverts = async () => {
        //    const data = await getRandomAdvertsService(1)   // Get one advert            
        //    setAdverts(data);            
        //}

        fetchUser();
        //fetchRandomAdverts();
    }, []);   

    console.log(user);

    if (!user) return <div>User</div>
 
    return (
        <>
        <div>User</div>
        <div>Name:</div><input type="text" value={name} onChange={event => setName(event.target.value)} />
        <div>Email:</div><input type="text" value={email} onChange={event => setEmail(event.target.value)} />        
        {user && user.Logo && <img src={user.Logo} alt="Logo" />}
        </>
    )
}

export default User