import { Typography } from "@mui/material";
import "../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <Typography variant="subtitle1" color="textSecondary" component="span" className="copyright">
                    © {new Date().getFullYear()} CertifiedGamer Project
                </Typography>
                <br />
                <Typography variant="subtitle1" color="textSecondary" component="span" className="github-link">
                    <a href="https://github.com/josephvgraffeo/gamer-profile-frontend" target="_blank" rel="noreferrer" className="link">
                        See the code on Github
                    </a>
                </Typography>
            </div>
        </footer>
    );
}