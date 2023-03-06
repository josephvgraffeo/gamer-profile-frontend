import { Select, MenuItem, Button, FormControl, TextField, Rating } from "@mui/material";
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
                setGamesList(data);
                setSelectedGame("");
                return data._id
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
        await handleAddGameToLibrary();
        await handleAddAdditionalEntryInfo();
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
        <>
            <div className="form-inputs">
                <div>
                    <Select displayEmpty value={selectedGame} onChange={handleSetSelectedGame} sx={{ width: "400px" }}>
                        <MenuItem value="" disabled>
                            <em>Select Game</em>
                        </MenuItem>
                        {gamesList.map(game => (
                            <MenuItem key={game._id} value={game._id}>{game.title}</MenuItem>
                        ))}
                    </Select>
                </div>
                <br />
                <div>
                    <FormControl onSubmit={handleSubmit} className="form-control">
                        <Rating name="rating" value={rating} precision={0.5} onChange={(e) => setRating(e.target.value)} />
                        <br />
                        <TextField label="Hours Played" value={hours} onChange={(e) => setHours(e.target.value)} />
                        <br />
                        <TextField label="Platform/Console" value={platform} onChange={(e) => setPlatform(e.target.value)} />
                        <br />
                        <TextField className="comments" label="Comments" value={comments} multiline rows={6} sx={{
                            width: '500px',
                            '& .MuiOutlinedInput-input': { width: '100%' },
                            '& .MuiOutlinedInput-root': { width: '100%' },
                        }} onChange={(e) => setComments(e.target.value)} />
                    </FormControl>
                </div>
                <br />
                <Button
                    onClick={handleSubmit}
                    disabled={!selectedGame}
                    style={{ backgroundColor: selectedGame ? 'green' : 'gray', color: 'white' }}>Add
                </Button>
            </div>
        </>
    )
}