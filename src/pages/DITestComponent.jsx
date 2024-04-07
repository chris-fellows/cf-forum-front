import { useInject } from "../DependencyInjection";

// Tests dependency injection
// Params: AdvertId
const DITestComponent = ({id}) => {
    const myService = useInject('myService');
    const myAppConfigService = useInject('myAppConfigService')

    return <div>DITestComponent {myService.foo} Backend URL: {myAppConfigService.backendURL} </div>;
}

export default DITestComponent