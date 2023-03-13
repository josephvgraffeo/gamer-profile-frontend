import { Select, MenuItem, Button, FormControl, TextField, Rating, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import "../../styles/librarycomponent.css";

export default function AddGameToLibrary(props) {
    const [gamesList, setGamesList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [rating, setRating] = useState("");
    const [hours, setHours] = useState("");
    const [platform, setPlatform] = useState("");
    const [comments, setComments] = useState("");

    function handleAddGameToLibrary() {
        fetch(`https://gamer-profile-project.web.app/gamerLibrary/${props.status}`, {
            method: 'POST',
            body: JSON.stringify({ gameId: selectedGame, _id: selectedGame }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setSelectedGame("");
                if (props.status === "playing") {
                    props.getPlayingLibrary();
                } else if (props.status === "completed") {
                    props.getCompletedLibrary();
                } else if (props.status === "backlog") {
                    props.getBacklogLibrary();
                }
                return data._id
            })
            .then(() => {
                handleAddAdditionalEntryInfo();
            })
            .catch(err => console.error(err))
    }

    function handleAddAdditionalEntryInfo() {
        fetch(`https://gamer-profile-project.web.app/entryInfo`, {
            method: 'POST',
            body: JSON.stringify({ gameId: selectedGame, rating: rating, hours: hours, platform: platform, comments: comments }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setRating("");
                setHours("");
                setPlatform("");
                setComments("");
            })
            .catch(err => console.error(err))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        handleAddGameToLibrary();
        handleAddAdditionalEntryInfo();
        props.handleCloseForm();
    }

    useEffect(() => {
        fetch('https://gamer-profile-project.web.app/games')
            .then(res => res.json())
            .then(data => {
                setGamesList(data);
            })
            .catch(error => console.error(error))
    }, [])

    function handleSetSelectedGame(e) {
        setSelectedGame(e.target.value);
    };

    return (
        <div className="form-container">
            <div className="close-components">
                <p className="close-form-text">Cancel</p><IconButton onClick={props.handleCloseForm}><CloseIcon className="close-form-button" /></IconButton>
            </div>
            <div className="form-inputs">
                <Select displayEmpty value={selectedGame} onChange={handleSetSelectedGame} className="drop-down-menu">
                    <MenuItem value="" disabled>
                        <em>Select Game</em>
                    </MenuItem>
                    {gamesList.map(game => (
                        <MenuItem key={game._id} value={game._id}>{game.title}</MenuItem>
                    ))}
                </Select>
                <br />
                <FormControl onSubmit={handleSubmit} className="form-control">
                    <Rating name="rating" value={rating} precision={0.5} onChange={(e) => setRating(e.target.value)} />
                    <TextField variant="filled" label="Hours Played" value={hours} onChange={(e) => setHours(e.target.value)} className="text-field" />
                    <TextField variant="filled" label="Platform/Console" value={platform} onChange={(e) => setPlatform(e.target.value)} className="text-field" />
                    <TextField label="Comments" value={comments} multiline rows={6} sx={{
                        '& .MuiOutlinedInput-input': { width: '100%' },
                        '& .MuiOutlinedInput-root': { width: '100%' },
                    }} onChange={(e) => setComments(e.target.value)}
                        className="comments-text-field" />
                </FormControl>
                <br />
                <Button
                    onClick={handleSubmit}
                    disabled={!selectedGame}
                    style={{ backgroundColor: selectedGame ? 'green' : 'gray', color: 'white' }}
                    className="input-button">Add
                </Button>
            </div>
        </div>
    )
}