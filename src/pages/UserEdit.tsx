import { useState, useEffect } from "react"
import { useSearchParams } from 'react-router-dom';
import { useInject2 } from "../useInject";
import getUserInfo from '../userInfo';
import { IUser } from "../Interfaces";
import { IUsersService } from "../serviceInterfaces";

// User edit
// Params: UserId
const UserEdit = ({userId} : any) => {
    const userInfo = getUserInfo();
    const [user, setUser] = useState<IUser>();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const userService = useInject2<IUsersService>('userService');      

      // Get user (Either passed userId, from querystring or default)
      let userIdSource = "param";
      const [searchParams] = useSearchParams();
      var theUserId = userId;   // Default to passed value
      if (theUserId == undefined) {   // Check query string        
          theUserId = searchParams.get("userid")!;        
          if (theUserId == undefined) {    // Current user
              theUserId = userInfo.userId;
              userIdSource = "current";
          } else {
            userIdSource = "query";
          }

      }    

    console.log("Entered User" + userIdSource + ":" + theUserId);

    useEffect(() => {       
        // Get root posts
        const fetchUser = async () => {            
            console.log("User: Getting user details");
            const data = await userService.GetUser(theUserId)
            setUser(data[0]);
            setName(data[0].Name);
            setEmail(data[0].Email);
            console.log(data);            
        }

        fetchUser();        
    }, []);   

    console.log(user);

    if (!user) return <div>User</div>
 
    return (
        <>
        <div>User</div>
        <ul style={ { listStyleType: "none" } }>
            <li>
                <label htmlFor={"username"}>Name:</label><input type="text" id={"username"} value={name} onChange={event => setName(event.target.value)} />
            </li>
            <li>
                <label htmlFor={"useremail"}>Email:</label><input type="text" id= {"useremail"} value={email} onChange={event => setEmail(event.target.value)} />        
            </li>
            <li>
                {user && user.Logo && <img src={user.Logo} alt="Logo" />}
            </li>
        </ul>
        </>
    )
}

export default UserEdit