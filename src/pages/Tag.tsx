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
        <div>{name}</div>
        </>
    )
}
export default Tag