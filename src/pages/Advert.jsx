import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

// Advert for display
// Params: AdvertId
const Advert = ({id}) => {
    const [advert, setAdvert] = useState([])

    return (
        <>
            <div>Advert</div>
            <img src={advert.Logo} alt="Logo" />
        </>
    )
}

export default Advert