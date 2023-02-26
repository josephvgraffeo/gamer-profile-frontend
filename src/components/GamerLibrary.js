import { useState } from "react";

export default function GamerLibrary() {
    const [games, setGames] = useState([]);
    const getGames = () => {
        fetch('https://gamer-profile-project.web.app/games')
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(error => console.error(error))
    }

    return (
        <>
            <button onClick={getGames}>Show Games</button>
            {games.map(games => (
                <div key={games.id}>
                    <h1>{games.title}</h1>
                    <p>Released on: {games.release_date}</p>
                    <p>Description: {games.description}</p>
                </div>
            ))}
        </>
    )
}