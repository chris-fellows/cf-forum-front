// Language information
// Params: None
interface ILanguage {
    name: string
    logo: string    
 }

// Displays language info (Name, logo)
const LanguageInfo = ({name, logo}: ILanguage) => {
    return (
        <>
        <div>{logo && <img src={logo} alt="Logo" width={20} height={20} />} {name}</div>
        </>
    )
}

export default LanguageInfo