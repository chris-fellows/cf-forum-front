import { IAdvert } from "../Interfaces";

interface IAdvertProps {
    advert: IAdvert
}

// Advert for display (Static image / Video)
// Params: Advert
const Advert = ({advert} : IAdvertProps) => {   
    const isImage = advert.LogoType == 1;
    const isMP4Video = advert.LogoType == 2;    // TODO: Support other video formats

      // Handle advert click
      const handleAdvertClick = async (e: any) => {    
        console.log("Opening advert " + advert.External);
        window.open(advert.External,'_blank', 'noreferrer');

        /* Don't pause/play video
        if (e.target.paused) {
            e.target.play();
        } else {
            e.target.pause();
        } 
        */       
    }

    return (
        <>            
            {isImage ? ( <img src={advert.Logo} alt= {advert.Name} /> ) 
                : ( <div/> )             
            }

            {isMP4Video ?
            (
                <video width="160" height="120" title={advert.Name} autoPlay onClick={(e) => handleAdvertClick(e) }>
                    <source src={advert.Logo} type="video/mp4" />                                
                </video>
            ):  ( <div/> )
            }
        </>
    )
}

export default Advert