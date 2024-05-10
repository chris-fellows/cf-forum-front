import appConfig  from "../appConfig";
import LoginCheck from "./LoginCheck";

// Contact information
// Params: None
const Contact = () => {
    
    return (
        <>
            <LoginCheck/>
            <div>Contact</div>                        
            <p>Email: {appConfig.supportEmail}</p>
        </>
    )
}

export default Contact