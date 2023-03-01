import { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/signupform.css"

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email })
    };

    return (
        <Box className="form-main-box">
            <form onSubmit={handleSubmit}>
                <div className="form-main-div">
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="signup-form-button" type="submit" variant="contained" component={Link} to="/gamerprofile">
                                Login
                            </Button>
                            <Button className="signup-form-button" type="submit" variant="contained" component={Link} to="/signup">
                                Don't have an account? Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Box>
    );
};