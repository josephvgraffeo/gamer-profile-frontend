import { CircularProgress, IconButton, Modal, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddGameToLibrary from "./AddToLibrary";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../../styles/librarycomponent.css";
import "../../styles/infomodal.css";

export default function Completed() {
    const [completedLibrary, setCompletedLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [infoIsLoading, setInfoIsLoading] = useState(true);
    const [formShowing, setFormShowing] = useState(false);
    const [infoModalData, setInfoModalData] = useState([]);
    const [infoModalShowing, setInfoModalShowing] = useState(false);
    const [infoModalId, setInfoModalId] = useState(null);

    useEffect(() => { getCompletedLibrary() }, [])

    function getCompletedLibrary() {
        fetch('https://gamer-profile-project.web.app/gamerlibrary/completed')
            .then(res => res.json())
            .then(data => {
                setCompletedLibrary(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    function removeFromCompletedLibrary(gameId) {
        fetch(`https://gamer-profile-project.web.app/gamerlibrary/completed/${gameId}`, {
            method: 'PATCH',
            body: JSON.stringify({ gameId: gameId }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Game removed:", data);
                getCompletedLibrary();
            })
            .catch(err => console.error(err));
    }

    function getAdditionalEntryInfo(gameId) {
        fetch(`https://gamer-profile-project.web.app/entryInfo/${gameId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setInfoModalData([data])
                setInfoIsLoading(false);
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
                    size={100}
                    style={{
                        color: "#4c00be",
                        position: "absolute",
                        top: "31%",
                        left: "45%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
                ) : (
                    <div>
                        <div style={{ paddingBottom: 32 }}>
                            <h1 className="status-text">Completed
                                <IconButton className="add-button" onClick={handleFormShowing}>
                                    <Typography className="add-button-text">Add</Typography>
                                    <AddCircleOutlineIcon className="add-button" />
                                </IconButton>
                            </h1>
                        </div>
                        <div className="library-container">
                            {completedLibrary.map((completedEntry) => (
                                <div key={completedEntry._id}>
                                    {completedEntry.games.map((game) => (
                                        <div key={game.title} className="library-row">
                                            <img className="library-image" src={game.cover_image} alt={game.title} onClick={() => handleInfoModalShowing(game._id)} />
                                            <h4 className="library-title">{game.title} <IconButton onClick={() => removeFromCompletedLibrary(game._id)}><HighlightOffIcon sx={{ color: "red" }} className="delete-button" /></IconButton></h4>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {formShowing && (
                            <Modal className="form-modal" open={true} onClose={handleCloseForm}>
                                <AddGameToLibrary status="completed" handleCloseForm={handleCloseForm} getCompletedLibrary={getCompletedLibrary} />
                            </Modal>
                        )}
                        {infoModalShowing && (
                            <Modal className="info-modal" open={true} onClose={handleCloseInfoModal}>
                                {infoIsLoading ? (
                                    <div className="loading-circle">
                                        <CircularProgress style={{
                                            color: "#ffffff",
                                            position: "absolute",
                                            zIndex: 100,
                                            transform: "translate(-50%, -50%)",
                                        }} />
                                    </div>
                                ) : (
                                    <div className="info-modal-content">
                                        {infoModalData.map((info) => (
                                            <div key={info._id}>
                                                <h4>Rating: </h4><Rating readOnly value={info.rating} />
                                                <h4>Hours: </h4><p>{info.hours}</p>
                                                <h4>Platform: </h4><p>{info.platform}</p>
                                                <h4>Comments: </h4><p>{info.comments}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Modal>
                        )}
                    </div>
                )}
        </>
    )
}