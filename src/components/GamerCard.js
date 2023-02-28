import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "../styles/gamercard.css";

export default function GamerCard() {
    const [gamerCard, setGamerCard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { getGamerCard() }, [])
    const getGamerCard = () => {
        fetch('https://gamer-profile-project.web.app/gamerCard')
            .then(res => res.json())
            .then(data => {
                setGamerCard(data);
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
                    style={{ position: 'absolute', top: '35%', left: '35%', transform: 'translate(-50%, -50%)' }}
                    />
                : <div>
                    {gamerCard.map(gamerCard => (
                        <div key={gamerCard.id}>
                            <img className="card-image" src={gamerCard.profile_pic} alt="profile pic" />
                            <div className="card-section-div">
                                <h2>{gamerCard.name}</h2>
                            </div>
                            <div className="card-section-div">
                                <h4>{gamerCard.about}</h4>
                            </div>
                            <div className="card-section-div">
                                <h4>Battle.net - {gamerCard.gamertags.battlenet}</h4>
                                <h4>Steam ID - {gamerCard.gamertags.steam}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}