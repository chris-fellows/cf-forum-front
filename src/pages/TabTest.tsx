import TabGroup from './TabGroup';
import TabItem from './TabItem';
import getUserInfo from '../userInfo';
import PopularRootPosts from './PopularRootPosts';
import CurrentUser from './CurrentUser';

// Params: None
const TabTest = () => {
    const userInfo = getUserInfo();
  
    return (
        <>                       
           <TabGroup>
                <TabItem name={ "Tab 1" }>
                    <div>Tab 1 content</div>
                    <button>Click Me</button>
                    <CurrentUser></CurrentUser>

                </TabItem>
                <TabItem name={ "Tab 2" }>
                    <div>Tab 2 content</div>
                    <button>Click Me</button>
                </TabItem>
                <TabItem name={ "Tab 3" }>
                    <div>Tab 3 content</div>
                    <button>Click Me</button>
                </TabItem>
           </TabGroup>           
        </>
    )
}

export default TabTest