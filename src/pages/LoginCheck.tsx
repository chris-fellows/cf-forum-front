import getUserInfo from '../userInfo';
import { Navigate } from "react-router-dom";

// Login Check. Redirects to login page if not logged in. This component should be added to each 
// page that needs the login check.
// Params: None
const LoginCheck = () => {
    const userInfo = getUserInfo();
    if (userInfo.userName.length == 0)
    {
        return <Navigate to='/login' replace={true} />
    }
    
    return (
        <>            
        </>
    )
}

export default LoginCheck