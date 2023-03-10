import { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import "../styles/signup.css"

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { createUser } = UserAuth();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createUser(email, password);
            navigate("/gamerprofile")
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="signup-page-background">
            <div className="signup-form-container">
                <Typography className="signup-form-title">Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <div className="form-main-div">
                        <Grid container spacing={1.5}>
                            <Grid className="signup-form-main-grid" item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    value={email}
                                    className="text-field"
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="filled"
                                    value={password}
                                    className="text-field"
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="signup-form-button" type="submit" variant="contained">
                                    Sign Up
                                </Button>
                                <p className="form-footer">Already have an account? <Link to="/login">Login</Link></p>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    );
};