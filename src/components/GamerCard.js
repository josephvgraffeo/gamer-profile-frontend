import { useState, useEffect } from "react";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import "../styles/gamercard.css";

export default function GamerCard() {
    const [gamerCard, setGamerCard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedGamerCard, setEditedGamerCard] = useState({});

    useEffect(() => { getGamerCard() }, [])

    function capitalizeFirstLetter(element) {
        return element.charAt(0).toUpperCase() + element.slice(1)
    }

    function getGamerCard() {
        fetch('https://gamer-profile-project.web.app/gamerCard')
            .then(res => res.json())
            .then(data => {
                setGamerCard(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    function handleIsEditing() {
        setIsEditing(true);
        setEditedGamerCard(gamerCard[0]);
    }

    function handleCancel() {
        setIsEditing(false);
        setEditedGamerCard({});
    }

    function handleSave(e) {
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

    function handleChangedData(e) {
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
                        top: "0%",
                        left: "30%",
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
                                        className="text-field"
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
                                        className="text-field"
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
                                {Object.keys(gamerCard.gamertags).map((tag) => (
                                    <div key={tag}>
                                        <h4 tag={tag}>
                                            {capitalizeFirstLetter(tag)} - {" "}
                                            {gamerCard.gamertags[tag]}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            {isEditing ? (
                                <div className="edit-button-group">
                                    <Button variant="contained" className="save-button" onClick={handleSave}>Save Changes</Button>
                                    <Button variant="contained" className="cancel-button" onClick={handleCancel}>Cancel</Button>
                                </div>
                            ) : (
                                <p className="edit-card-text"> Edit <IconButton className="icon-button" onClick={handleIsEditing}><EditIcon className="edit-button" /></IconButton></p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
};
