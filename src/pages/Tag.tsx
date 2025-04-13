// Tag information
// Params: None
interface ITag {
    name: string
    logo: string    
 }

// Displays tag
const Tag = ({name}: ITag) => {
    return (
        <>
        <span className="Tag">{name}</span>
        </>
    )
}
export default Tag