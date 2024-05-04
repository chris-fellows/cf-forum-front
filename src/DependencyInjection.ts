import { ContainerContext } from "./App";
import { useContext } from "react";

// Define a hook to access the container from within a component
export const useContainer = () => {
    const container = useContext(ContainerContext);
    if (!container) {
      throw new Error('Container not found. Make sure to wrap your components with a ContainerProvider.');
    }
    return container;
  };

// TODO: Remove this, use typed version
 // Define a hook to inject dependencies from the container
export const useInject = (identifier : string) => {
    const container = useContainer();
    return container.resolve(identifier);
  };

// Define a hook to inject dependencies from the container
export const useInject2 = <T>(identifier : string) : T => {
  const container = useContainer();
  return container.resolve(identifier) as T
};

  