import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

// Displays user info (Name, logo)
// Params: UserId
const UserInfo = ({name, logo}) => {
    return (
        <>
        <div>{name}</div> {logo && <img src={logo} alt="Logo" />}
        </>
    )
}

export default UserInfo