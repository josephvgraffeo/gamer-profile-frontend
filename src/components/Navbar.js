import { AppBar, Toolbar, Typography, Stack, Button, Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";
import "../styles/navbar.css";

export default function Navbar() {
    const [navHeader, setNavHeader] = useState("CertifiedG****")
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
                <Typography className="navbar-header" variant="h4" component="div" >{navHeader}</Typography>
                <Stack className="navbar-stack" direction="row" spacing={2}>
                    <Box className="navbar-box">
                        <Button className="navbar-button" size="large" variant="text" component={Link} to="/gamerprofile">Profile</Button>
                        <br />
                        <Button className="navbar-button" size="large" variant="text" component={Link} to="/account">Account</Button>
                        <br />
                        <Button className="navbar-button" size="large" variant="text" onClick={handleLogout}>{user ? "Logout" : "Login"}</Button>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}