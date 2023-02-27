import { useState } from "react";

export default function GamerCard() {
    const [gamerCard, setGamerCard] = useState([]);
    const getGamerCard = () => {
        fetch('https://gamer-profile-project.web.app/gamerCard')
            .then(res => res.json())
            .then(data => setGamerCard(data))
            .catch(error => console.error(error))
    }
   
    return (
        <h1>This is the gamer card</h1>
    )
}