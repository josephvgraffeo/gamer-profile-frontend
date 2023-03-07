import { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import "../styles/login.css"

export default function LoginForm() {
    const { loginUser } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate("/gamerprofile");
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="login-page-background">
            <div className="login-form-container">
                <Typography className="login-form-title">Login</Typography>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-main-div">
                        <Grid container spacing={1.5}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    className="text-field"
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    className="text-field"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="login-form-button" type="submit" variant="contained">
                                    Login
                                </Button>
                                <p className="form-footer">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    );
};