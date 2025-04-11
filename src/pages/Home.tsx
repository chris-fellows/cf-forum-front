import PopularRootPosts from "./PopularRootPosts";
import getUserInfo from '../userInfo';
import ContentByName from "./ContentByName";

// Home information
// Params: None
const Home = () => {
    const userInfo = getUserInfo();
    
    return (
        <>
            <div>Home</div>                           
            <ContentByName name= { "Home Message" }/>                        
            {userInfo.isLoggedIn && <PopularRootPosts maxPosts={10} />}
        </>
    )
}

export default Home