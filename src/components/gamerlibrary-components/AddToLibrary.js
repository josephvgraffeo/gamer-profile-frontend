import { Select, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function AddGameToLibrary() {
    const [gamesList, setGamesList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");

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

    function handleAddGameToLibrary() {
        console.log(selectedGame);
        setSelectedGame("")
    }

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
                <Button
                    onClick={handleAddGameToLibrary}
                    disabled={!selectedGame}
                    style={{ backgroundColor: selectedGame ? 'green' : 'gray', color: 'white' }}
                >Add</Button>
            </div>
        </>
    )
}