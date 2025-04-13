import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface IUser {
    name: string
    logo: string    
 }

// Displays user info (Name, logo)
// Params: UserId
const UserInfo = ({name, logo}: IUser) => {
    return (
        <>
        <div>{logo && <img src={logo} alt="Logo" width={20} height={20} />} {name}</div>
        </>
    )
}

export default UserInfo