import appConfig  from "../appConfig";

// Contact information
// Params: None
const Contact = () => {
    
    return (
        <>
            <div>Contact</div>                        
            <p>Email: {appConfig.supportEmail}</p>
        </>
    )
}

export default Contact