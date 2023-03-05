import { Select, MenuItem, Button, FormControl, TextField, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import "../../styles/librarycomponent.css";

export default function AddGameToLibrary(props) {
    const [gamesList, setGamesList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");

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
            })
            .catch(error => console.error(error))
    }

    function handleAdditionalEntryInfo() {

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
                    <FormControl className="form-control">
                        <Rating name="rating" precision={0.5} />
                        <br />
                        <TextField label="Hours Played" />
                        <br />
                        <TextField label="Platform/Console" />
                        <br />
                        <TextField className="comments" label="Comments" multiline rows={6} sx={{
                            width: '500px',
                            '& .MuiOutlinedInput-input': { width: '100%' },
                            '& .MuiOutlinedInput-root': { width: '100%' },
                        }} />
                    </FormControl>
                </div>
                <br />
                <Button
                    onClick={handleAddGameToLibrary}
                    disabled={!selectedGame}
                    style={{ backgroundColor: selectedGame ? 'green' : 'gray', color: 'white' }}>Add
                </Button>
            </div>
        </>
    )
}