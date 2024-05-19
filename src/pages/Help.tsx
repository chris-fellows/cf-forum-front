import { useRef, useState } from "react"

// Help information
// Params: None
const Help = () => {        
    const frameRef = useRef<HTMLIFrameElement>(null);       
    
    // List of help items
    const items =  [ 
                { display: "<None>", url: "" },
                { display: "Frequently Asked Questions", url: "help/faq.html" },
                { display: "Privacy", url: "help/privacy.html" },
                { display: "Terms of Service", url: "help/termsofservice.html" },
                { display: "Troubleshooting", url: "help/troubleshooting.html" }                
            ];

    const handleItemSelected = (e : any) => {
        e.preventDefault();
        frameRef.current!.src = e.target.value;        
    };
    
    return (
        <>
            <div>Help</div>                                                     
            <div>Items:<select name="items" title="items" onChange={(e) => handleItemSelected(e)} style={{width: "300px" }}>
                {items.map(item =>                        
                    <option value={item.url}>{item.display}</option>
                )}
            </select></div>
            <iframe ref={frameRef} title="item" width="1000" height="680" style={{ border: "none" }} />
        </>
    )
}

export default Help