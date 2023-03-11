import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/contactinfo.css";

export default function ContactInfo() {
    return (
        <div className="contact-about-background">
            <div className="contact-about-container">
                <h1>About CertifiedGamer</h1>
                <div>
                    <h2>About Me:</h2>
                    <p>Here is a text block about me and the site</p>
                </div>
                <h1>How To Contact</h1>
                <div>
                    <h2>Contact Information:</h2>
                    <img src="https://gamer-profile-img-bucket.s3.amazonaws.com/profile-images/candidate-page-qr.png" alt="contact-qr-code" className="contact-qr" />
                </div>
                <Button className="contact-about-button" component={Link} to='/gamerprofile'>Return to Profile</Button>
            </div>
        </div>
    )
}