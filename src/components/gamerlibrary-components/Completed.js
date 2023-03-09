import { CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../../styles/librarycomponent.css";
import AddGameToLibrary from "./AddToLibrary";

export default function Completed() {
    const [completedLibrary, setCompletedLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formShowing, setFormShowing] = useState(false);

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
                    <div>
                        <div style={{ paddingBottom: 32 }}>
                            <h1 className="status-text">Completed:
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
                                            <img className="library-image" src={game.cover_image} alt={game.title} />
                                            <h4 className="library-title">{game.title}</h4><IconButton sx={{ fontSize: "small", color: "red" }}><HighlightOffIcon /></IconButton>
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
                    </div>
                )}
        </>
    )
}