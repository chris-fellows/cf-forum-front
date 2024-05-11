import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import LoginCheck from "./LoginCheck";
import getUserInfo from "../userInfo";

// TODO: Add user settings
// User settings
// Params: None
const UserSettings = () => {
    const userInfo = getUserInfo();

    return (
        <>
        <LoginCheck/>
        <div>User Settings</div>
        </>
    )
}

export default UserSettings