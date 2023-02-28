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

    function capitalizeFirstLetter(element) {
        return element.charAt(0).toUpperCase() + element.slice(1)
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
                        <div key={gamerCard.username}>
                            <img className="card-image" src={gamerCard.profile_pic} alt="profile pic" />
                            <div className="card-section-div">
                                <h3>{gamerCard.greeting}</h3>
                            </div>
                            <div className="card-section-div">
                                <h3>{gamerCard.about}</h3>
                            </div>
                            <div className="card-section-div">
                                {Object.keys(gamerCard.gamertags).map((element) => (
                                    <h4 element={element}>
                                        {capitalizeFirstLetter(element)} - {gamerCard.gamertags[element]}
                                    </h4>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}