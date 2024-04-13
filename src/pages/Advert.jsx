//import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";

// Advert for display (Static image / Video)
// Params: Advert
const Advert = ({advert}) => {
    //const [advert, setAdvert] = useState([])
    //   <div>{advert.Name}</div>
    //<img src={advert.Logo} alt="Logo" />

    const isImage = advert.LogoType == 1;
    const isMP4Video = advert.LogoType == 2;    // TODO: Support other video formats

      // Handle group click, displays group root posts
      const handleAdvertClick = async () => { 
        //e.preventDefault();        
        
    }

    return (
        <>
            <div>{advert.Name}</div>
            {isImage ? ( <img src={advert.Logo} alt="Logo" /> ) 
                : ( <div/> )             
            }

            {isMP4Video ?
            (
                <video width="320" height="240" autoPlay onClick={() => handleAdvertClick() }>
                    <source src={advert.Logo} type="video/mp4" />                                
                </video>
            ):  ( <div/> )
            }
        </>
    )
}

export default Advert