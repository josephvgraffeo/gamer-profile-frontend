import { CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../../styles/librarycomponent.css";

export default function Backlog() {
    const [backlogLibrary, setBacklogLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { getBacklogLibrary() }, [])

    function getBacklogLibrary() {
        fetch('https://gamer-profile-project.web.app/gamerlibrary/backlog')
            .then(res => res.json())
            .then(data => {
                setBacklogLibrary(data);
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
                        <IconButton><AddCircleOutlineIcon /></IconButton>
                        <h1>Backlog:</h1>
                        {backlogLibrary.map((backlogEntry) => (
                            <div key={backlogEntry._id}>
                                {backlogEntry.games.map((game) => (
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