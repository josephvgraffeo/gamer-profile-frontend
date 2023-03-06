import { CircularProgress, IconButton, Modal, Typography } from "@mui/material";
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
                                <IconButton className="add-button" onClick={handleFormShowing}>
                                    <Typography className="add-button-text">Add To Playing</Typography>
                                    <AddCircleOutlineIcon className="add-button" />
                                </IconButton>
                                <h1 className="status-text">Playing:</h1>
                            <div className="library-container">
                                {playingLibrary.map((playingEntry) => (
                                    <div key={playingEntry._id} >
                                        {playingEntry.games.map((game) => (
                                            <div key={game.title} className="library-row">
                                                <img className="library-image" src={game.cover_image} alt={game.title} />
                                                <h4 className="library-title">{game.title}</h4>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            {formShowing && (
                                <Modal className="form-modal" open={true} onClose={handleCloseForm}>
                                    <AddGameToLibrary status="playing" />
                                </Modal>
                            )}
                        </div>
                    </>
                )}
        </>
    )
}
