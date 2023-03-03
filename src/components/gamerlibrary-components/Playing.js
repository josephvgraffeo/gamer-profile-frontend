import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "../../styles/librarycomponent.css";

export default function Playing() {
    const [playingLibrary, setPlayingLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { getPlayingLibrary() }, [])

    function getPlayingLibrary() {
        fetch('https://gamer-profile-project.web.app/gamerlibrary/playing')
            .then(res => res.json())
            .then(data => {
                setPlayingLibrary(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress
                    color="secondary"
                    size={100}
                    style={{
                        position: "absolute",
                        top: "0%",
                        left: "30%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : (
                <>
                    <div>
                        <h1>Playing:</h1>
                        {playingLibrary.map((playingEntry) => (
                            <div key={playingEntry._id}>
                                {playingEntry.games.map((game) => (
                                    <div key={game.title}>
                                        <img className="library-image" src={game.cover_image} alt={game.title} />
                                        <h4 className="library-title">{game.title}</h4>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
