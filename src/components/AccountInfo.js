import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
import "../styles/accountinfo.css";

export default function AccountInfo() {
    const { user } = UserAuth();

    return (
        <div className="account-info-background">
            <div className="account-info-container">
                <h1>Account Information:</h1>
                <p>User Email: <p style={{ display: "inline" }}>{user && user.email}</p></p>
                <p>Account Created On: <p style={{ display: "inline" }}>{user.metadata.creationTime}</p></p>
                <p>Last Sign In: <p style={{ display: "inline" }}>{user.metadata.lastSignInTime}</p></p>
                <Button className="account-info-button" component={Link} to='/gamerprofile'>Return to Profile</Button>
            </div>
        </div>
    )
}