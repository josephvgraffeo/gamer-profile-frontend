import { Button, CircularProgress, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AddGameToLibrary from "./AddToLibrary.js";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../../styles/librarycomponent.css";

export default function Playing() {
    const [playingLibrary, setPlayingLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formShowing, setFormShowing] = useState(false);

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

    function handleFormShowing() {
        setFormShowing(true);
    }

    function handleCloseForm() {
        setFormShowing(false);
    }

    return (
        <>
            {isLoading
                ? (<CircularProgress
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
                            <IconButton onClick={handleFormShowing}><AddCircleOutlineIcon /></IconButton>
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
                            {formShowing && (
                                <Modal open={true} onClose={handleCloseForm}>
                                    <AddGameToLibrary />
                                </Modal>
                            )}
                        </div>
                    </>
                )}
        </>
    )
}
