// Language information
// Params: None
interface ILanguage {
    name: string
    logo: string    
 }

// Displays language info (Name, logo)
const Language = ({name, logo}: ILanguage) => {
    return (
        <>
        <p>{logo && <img src={logo} alt="Logo" width={20} height={20} />} {name}</p>
        </>
    )
}

export default Language