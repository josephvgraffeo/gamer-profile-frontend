import { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import "../styles/gamelibrary.css"
import Playing from "./gamerlibrary-components/Playing.js";
import Completed from "./gamerlibrary-components/Completed.js";
import Backlog from "./gamerlibrary-components/Backlog.js";

export default function GamerLibrary() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { getGames(); }, [])

    function getGames() {
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
                :
                <Grid className="main-status-container" container>
                    <Grid className="status-row" container direction="row">
                        <div className="status-row-playing" container xs={12} sm={6} md={4} lg={3}>
                            <Playing />
                            {/* {games.map(games => (
                            <Grid key={games.id} item xs={12} sm={6} md={4} lg={3}>
                                <img className="game-cover" src={games.cover_image} alt="cover pic" />
                                <h3 className="game-title">{games.title}</h3>
                            </Grid>
                        ))} */}
                        </div>
                        <br />
                        <div className="status-row-completed" container xs={12} sm={6} md={4} lg={3}>
                            <Completed />
                            {/* <img className="game-cover" src={'https://gamer-profile-img-bucket.s3.amazonaws.com/dragon-quest-11.webp'} alt="cover pic" />
                            <h3 className="game-title">TBD</h3> */}
                        </div>
                        <br />
                        <div className="status-row-backlog" container xs={12} sm={6} md={4} lg={3}>
                            <Backlog />
                            {/* <img className="game-cover" src={'https://gamer-profile-img-bucket.s3.amazonaws.com/dragon-quest-11.webp'} alt="cover pic" />
                            <h3 className="game-title">TBD</h3> */}
                        </div>
                    </Grid>
                </Grid>
            }
        </>
    )
}