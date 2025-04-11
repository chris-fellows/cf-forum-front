import StringAsHTML from "./StringAsHTML";

// Privacy information
// Params: None
const Privacy = () => {    
    //<div dangerouslySetInnerHTML={{ __html: "<p>some data </p>" }} />                        

    function createMarkup(content : string) {
        return { __html: content };
    }
    
    return (
        <>            
            <div>Privacy information</div>

            <StringAsHTML content={ "<div><p>This is some text</p></div>"}/>
        </>
    )
}

export default Privacy
