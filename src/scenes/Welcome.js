import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function WelcomePage() {
    return (
        <>
            <h1>This is a welcome page</h1>
            <Typography>Already have an account? Login here!<Button component={Link} to="/login">Login</Button></Typography>
            <Typography>New user? Create an account!<Button component={Link} to="/signup">Signup</Button></Typography>
        </>
    )
}