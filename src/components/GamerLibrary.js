import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

export default function GamerLibrary() {
    const [games, setGames] = useState([]);
    useEffect(() => {getGames();}, [])
    const getGames = () => {
        fetch('https://gamer-profile-project.web.app/games')
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(error => console.error(error))
    }

    return (
        <Grid container spacing={2} direction="row">
            {games.map(games => (
                <Grid key={games.id} item xs={12} sm={6} md={4} lg={3}>
                    <img src={games.cover_image} alt="cover pic" />
                    <h3>{games.title}</h3>
                </Grid>
            ))}
        </Grid>
    )
}