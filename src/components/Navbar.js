import { AppBar, Toolbar, Stack, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
import "../styles/navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = UserAuth();;

    async function handleLogout() {
        try {
            await logout();
            navigate("/login")
            console.log("logged out");
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <AppBar className="navbar" position="static">
            <Toolbar className="navbar-toolbar" sx={{ justifyContent: 'space-between' }}>
                <img src="https://gamer-profile-img-bucket.s3.amazonaws.com/profile-images/vice-logo.png" alt="header" onClick={() => navigate("/gamerprofile")} className="nav-logo" />
                {/* <Typography className="navbar-header" variant="h4" component="div">CertifiedGamer</Typography> */}
                <Stack className="navbar-stack" direction="row" spacing={2}>
                    <Box className="navbar-box">
                        <Button className="navbar-button" size="large" variant="text" component={Link} to="/gamerprofile">Profile</Button>
                        <br />
                        <Button className="navbar-button" size="large" variant="text" component={Link} to="/account">Account</Button>
                        <br />
                        <Button className="navbar-button" size="large" variant="text" component={Link} to="/contact">Contact</Button>
                        <br />
                        <Button className="navbar-button" size="large" variant="text" onClick={handleLogout}>{user ? "Logout" : "Login"}</Button>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}