interface ITabItemProps {
    name: string
    children : React.ReactNode 
}

// Custom menu item
const TabItem = ( { name, children } : ITabItemProps) => {      
   return (
    <>        
        <div className="TabItemDiv">{children}</div>
    </>
   )
}

export default TabItem