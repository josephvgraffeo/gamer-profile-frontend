import { CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../../styles/librarycomponent.css";
import AddGameToLibrary from "./AddToLibrary";

export default function Backlog() {
    const [backlogLibrary, setBacklogLibrary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formShowing, setFormShowing] = useState(false);

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

    function handleFormShowing() {
        setFormShowing(true);
    }

    function handleCloseForm() {
        setFormShowing(false);
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
                <div>
                    <div style={{ paddingBottom: 40 }}>
                        <IconButton className="add-button" onClick={handleFormShowing}>
                            <Typography className="add-button-text">Add To Backlog</Typography>
                            <AddCircleOutlineIcon className="add-button" />
                        </IconButton>
                        <h1 className="status-text">Backlog:</h1>
                    </div>
                    <div className="library-container">
                        {backlogLibrary.map((backlogEntry) => (
                            <div key={backlogEntry._id}>
                                {backlogEntry.games.map((game) => (
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
                            <AddGameToLibrary status="backlog" getBacklogLibrary={getBacklogLibrary} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    )
}