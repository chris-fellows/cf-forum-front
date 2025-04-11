import PopularRootPosts from "./PopularRootPosts";
import getUserInfo from '../userInfo';

// Home information
// Params: None
const Home = () => {
    const userInfo = getUserInfo();

    return (
        <>
            <div>Home</div>               
            {userInfo.isLoggedIn && <PopularRootPosts maxPosts={10} />}
        </>
    )
}

export default Home