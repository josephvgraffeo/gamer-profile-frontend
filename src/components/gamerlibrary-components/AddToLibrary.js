import { Select, MenuItem, Button, FormControl, TextField, Rating } from "@mui/material";
import { useState, useEffect } from "react";

export default function AddGameToLibrary(props) {
    const [gamesList, setGamesList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");

    async function handleAddGameToLibrary() {
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
            <div>
                <Select displayEmpty value={selectedGame} onChange={handleSetSelectedGame}>
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
                <FormControl>
                    <Rating name="rating" precision={0.5} />
                    <TextField label="Hours Played" />
                    <TextField label="Platform/Console" />
                    <TextField label="Comments" />
                </FormControl>
            </div>
            <br />
            <Button
                onClick={handleAddGameToLibrary}
                disabled={!selectedGame}
                style={{ backgroundColor: selectedGame ? 'green' : 'gray', color: 'white' }}>Add
            </Button>
        </>
    )
}