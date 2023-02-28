import { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import "../styles/gamelibrary.css"

export default function GamerLibrary() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { getGames(); }, [])
    const getGames = () => {
        fetch('https://gamer-profile-project.web.app/games')
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            {isLoading
                ? <CircularProgress
                    color="secondary"
                    size={100}
                    style={{ position: 'absolute', top: '40%', left: '58%', transform: 'translate(-50%, -50%)' }}
                />
                : <Grid className="library-grid-container" container spacing={2} direction="row">
                    {games.map(games => (
                        <Grid key={games.id} item xs={12} sm={6} md={4} lg={3}>
                            <img className="game-cover" src={games.cover_image} alt="cover pic" />
                            <h3>{games.title}</h3>
                        </Grid>
                    ))}
                </Grid>
            }
        </>
    )
}