import { CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddGameToLibrary from "./AddToLibrary.js";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../../styles/librarycomponent.css";

export default function Playing() {
    const [playingLibrary, setPlayingLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formShowing, setFormShowing] = useState(false);
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModalShowing, setInfoModalShowing] = useState(false);
    const [infoModalId, setInfoModalId] = useState(null);

    useEffect(() => { getPlayingLibrary() }, [])

    function getPlayingLibrary() {
        fetch('https://gamer-profile-project.web.app/gamerlibrary/playing')
            .then(res => res.json())
            .then(data => {
                setPlayingLibrary(data);
                setIsLoading(false);
            })
            .catch(err => console.error(err))
    }

    function removeFromPlayingLibrary(gameId) {
        fetch(`https://gamer-profile-project.web.app/gamerlibrary/playing/${gameId}`, {
            method: 'PATCH',
            body: JSON.stringify({ gameId: gameId }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Game removed:", data);
                getPlayingLibrary();
            })
            .catch(err => console.error(err));
    }

    function getAdditionalEntryInfo(gameId) {
        fetch(`https://gamer-profile-project.web.app/entryInfo/${gameId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setInfoModalData([data])
            })
            .catch((err) => console.error(err));
    }

    function handleFormShowing() {
        setFormShowing(true);
    }

    function handleCloseForm() {
        setFormShowing(false);
    }

    async function handleInfoModalShowing(gameId) {
        setInfoModalShowing(true);
        setInfoModalId(gameId);
        await getAdditionalEntryInfo(gameId);
        console.log(gameId)
    }

    function handleCloseInfoModal() {
        setInfoModalShowing(false);
        setInfoModalId("");
        setInfoModalData([]);
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
                    <div>
                        <div style={{ paddingBottom: 32 }}>
                            <h1 className="status-text">Playing
                                <IconButton className="add-button" onClick={handleFormShowing}>
                                    <Typography className="add-button-text">Add</Typography>
                                    <AddCircleOutlineIcon className="add-button-icon" />
                                </IconButton>
                            </h1>
                        </div>
                        <div className="library-container">
                            {playingLibrary.map((playingEntry) => (
                                <div key={playingEntry._id}>
                                    {playingEntry.games.map((game) => (
                                        <div key={game.title} className="library-row">
                                            <img className="library-image" src={game.cover_image} alt={game.title} onClick={() => handleInfoModalShowing(game._id)} />
                                            <h4 className="library-title">{game.title} <IconButton onClick={() => removeFromPlayingLibrary(game._id)}><HighlightOffIcon sx={{ color: "red" }} /></IconButton></h4>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {formShowing && (
                            <Modal className="form-modal" open={true} onClose={handleCloseForm}>
                                <AddGameToLibrary status="playing" handleCloseForm={handleCloseForm} getPlayingLibrary={getPlayingLibrary} />
                            </Modal>
                        )}
                        {infoModalShowing && (
                            <Modal className="info-modal" open={true} onClose={handleCloseInfoModal}>
                                <div>
                                    {infoModalData.map((info) => (
                                        <div key={info._id}>
                                            <p>Rating: {info.rating}</p>
                                            <p>Hours: {info.hours}</p>
                                            <p>Platform: {info.platform}</p>
                                            <p>Comments: {info.comments}</p>
                                        </div>
                                    ))}
                                </div>
                            </Modal>
                        )}
                    </div>
                )}
        </>
    )
}