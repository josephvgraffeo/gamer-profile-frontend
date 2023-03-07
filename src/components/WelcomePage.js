import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "../styles/welcome.css";

export default function WelcomePage() {
    return (

        <div className="welcome-page-background">
            <div className="welcome-page-container">
                <h1>Welcome to CertifiedGamer</h1>
                <h3>Track what you're playing</h3>
                <h3>Connect with your friends</h3>
                <h3>Level up your gaming experience</h3>
                <div style={{ display: "inline" }}>
                    <p>Already have an account? Login here!<Button className="welcome-page-button" component={Link} to="/login">Login</Button></p>
                </div>
                <div style={{ display: "inline" }}>
                    <p>New user? Create an account!<Button className="welcome-page-button" component={Link} to="/signup">Signup</Button></p>
                </div>
            </div>
        </div>
    )
}