import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import "../styles/welcome.css";

export default function WelcomePage() {
    return (

        <div className="welcome-page-background">
            <div className="welcome-page-container">
                <img src="https://gamer-profile-img-bucket.s3.amazonaws.com/profile-images/site-logo-full-nobg.png" alt="logo" className="logo" />
                <h3>Track what you're playing</h3>
                <h3>Connect with your friends</h3>
                <h3>Level up your gaming experience</h3>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "inline", margin: 15 }}>
                        <p className="welcome-prompt">Already have an account? Login here!</p>
                        <Button className="welcome-page-button" component={Link} to="/login">Login</Button>
                    </div>
                    <div style={{ display: "inline", margin: 15 }}>
                        <p className="welcome-prompt">New user? Create an account!</p>
                        <Button className="welcome-page-button" component={Link} to="/signup">Signup</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}