import { IDependencyService } from "../serviceInterfaces";
import { ServiceFunctionType } from "../customTypes";

// Service for providing dependencies
export class DependencyService implements IDependencyService {

    private items : Map<string, any> = new Map();

    RegisterService<T>(name : string, serviceFunction : ServiceFunctionType<T>) : void
    {
        if (this.items.has(name))
        {
            this.items.delete(name);
        }
        this.items.set(name, serviceFunction);
    }

    IsRegistered(name: string) : boolean
    {
        return this.items.has(name);
    }

    GetService<T>(name : string) : T
    {
        if (this.items.has(name))
        {
            let item = this.items.get(name);
            return item() as T;
        }     
        return null as T;   
    }
}