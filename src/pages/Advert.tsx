import { IAdvert } from "../Interfaces";

interface IAdvertProps {
    advert: IAdvert
}

// Advert for display (Static image / Video)
// Params: Advert
const Advert = ({advert} : IAdvertProps) => {   
    const isImage = advert.LogoType == 1;
    const isMP4Video = advert.LogoType == 2;    // TODO: Support other video formats

      // Handle advert click, pauses or plays video
      const handleAdvertClick = async (e: any) => { 
        //e.preventDefault();                
        if (e.target.paused) {
            e.target.play();
        } else {
            e.target.pause();
        }        
    }

    return (
        <>
            <div>{advert.Name}</div>
            {isImage ? ( <img src={advert.Logo} alt="Logo" /> ) 
                : ( <div/> )             
            }

            {isMP4Video ?
            (
                <video width="160" height="120" autoPlay onClick={(e) => handleAdvertClick(e) }>
                    <source src={advert.Logo} type="video/mp4" />                                
                </video>
            ):  ( <div/> )
            }
        </>
    )
}

export default Advert