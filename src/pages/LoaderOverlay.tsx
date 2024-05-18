  import { ILoaderOverlapProps } from "../Interfaces";

  // Displays loading component to indicate busy
  function LoaderOverlay({ loading, message = "Loading..." } : ILoaderOverlapProps) {
    if (!loading) return null;

    return (
      <div className="LoaderOverlayContainer">
        <img className="LoaderOverlayImage" src="/images/loading.gif"/> {message}
      </div>
    );
  }
  
  export default LoaderOverlay;