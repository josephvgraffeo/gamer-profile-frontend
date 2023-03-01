import { useState, useEffect } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import "../styles/gamercard.css";

export default function GamerCard() {
    const [gamerCard, setGamerCard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedGamerCard, setEditedGamerCard] = useState({});

    useEffect(() => { getGamerCard() }, [])

    const capitalizeFirstLetter = (element) => {
        return element.charAt(0).toUpperCase() + element.slice(1)
    }

    const getGamerCard = () => {
        fetch('https://gamer-profile-project.web.app/gamerCard')
            .then(res => res.json())
            .then(data => {
                setGamerCard(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    const handleEditing = () => {
        setIsEditing(true);
        setEditedGamerCard(gamerCard[0]);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditedGamerCard({});
    }

    const handleSave = (e) => {
        e.preventDefault();
        fetch('https://gamer-profile-project.web.app/gamerCard/piratehntr', {
            method: 'PATCH',
            body: JSON.stringify(editedGamerCard),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setIsEditing(false);
                setGamerCard(data);
            })
            .catch(error => console.error(error))
    }

    const handleChangedData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setEditedGamerCard(previousData => ({ ...previousData, [name]: value }));
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress
                    color="secondary"
                    size={100}
                    style={{
                        position: "absolute",
                        top: "35%",
                        left: "35%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : (
                <div>
                    {gamerCard.map((gamerCard) => (
                        <div key={gamerCard.username}>
                            <img
                                className="card-image"
                                src={gamerCard.profile_pic}
                                alt="profile pic"
                            />
                            {isEditing ? (
                                <div className="card-section-div">
                                    <textarea
                                        name="greeting"
                                        value={editedGamerCard.greeting}
                                        onChange={handleChangedData}
                                    />
                                </div>
                            ) : (
                                <div className="card-section-div">
                                    <h3>{gamerCard.greeting}</h3>
                                </div>
                            )}
                            {isEditing ? (
                                <div className="card-section-div">
                                    <textarea
                                        name="about"
                                        value={editedGamerCard.about}
                                        onChange={handleChangedData}
                                    />
                                </div>
                            ) : (
                                <div className="card-section-div">
                                    <h3>{gamerCard.about}</h3>
                                </div>
                            )}
                            <div className="card-section-div">
                                {Object.keys(gamerCard.gamertags).map((element) => (
                                    <div key={element}>
                                        <h4 element={element}>
                                            {capitalizeFirstLetter(element)} - {" "}
                                            {gamerCard.gamertags[element]}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            {isEditing ? (
                                <div className="edit-button-group">
                                    <button className="save-button" onClick={handleSave}>Save</button>
                                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <p className="edit-card-text"> Edit <IconButton className="icon-button" onClick={handleEditing}><EditIcon className="edit-button" /></IconButton></p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
};
