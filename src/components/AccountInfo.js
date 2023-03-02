import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";

export default function AccountInfo() {
    const { user } = UserAuth();

    return (
        <div>
            <h1>Account Information:</h1>
            <p>User Email: {user && user.email}</p>
            <Button component={Link} to='/gamerprofile'>Return to Profile</Button>
        </div>
    )
}