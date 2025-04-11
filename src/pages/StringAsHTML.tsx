interface IStringAsHTML {
    content: string    
 }

// Renders raw string as HTML
const StringAsHTML = ( { content } : IStringAsHTML) => {        
    return (
        <>  
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    )
}

export default StringAsHTML
