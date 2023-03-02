import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import "../styles/signupform.css"

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { createUser } = UserAuth();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await createUser(email, password);
            navigate("/gamerprofile")
        } catch (e){
            setError(e.message);
            console.log(e.message);
        }
    };

    return (
        <Box className="form-main-box">
            <Typography>Signup</Typography>
            <form onSubmit={handleSubmit}>
                <div className="form-main-div">
                    <Grid container spacing={1.5}>
                        <Grid className="signup-form-main-grid" item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
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
                            <Button className="signup-form-button" type="submit" variant="contained">
                                Sign Up
                            </Button>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Box>
    );
};