import { useState, useEffect } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
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
            .catch(err => console.error(err))
    }

    function handleIsEditing() {
        setIsEditing(true);
        setEditedGamerCard(gamerCard[0]);
    }

    function handleCancel() {
        setIsEditing(false);
        setEditedGamerCard({});
    }

    function handleUpdateGamerCard(e) {
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
            .catch(err => console.error(err))
    }

    function handleChangedData(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setEditedGamerCard(initialObject => ({ ...initialObject, [name]: value }));
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress
                    size={100}
                    style={{
                        color: "#4c00be",
                        position: "absolute",
                        top: "35%",
                        left: "35%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : (
                <div className="card-container">
                    {gamerCard.map((gamerCard) => (
                        <div key={gamerCard._id}>
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
                                            {capitalizeFirstLetter(tag)} - {gamerCard.gamertags[tag]}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            {isEditing ? (
                                <div className="edit-button-group">
                                    <p className="save-button-text">Save</p><IconButton className="save-button" onClick={handleUpdateGamerCard}><CheckBoxIcon /></IconButton>
                                    <p className="cancel-button-text">Cancel</p><IconButton className="cancel-button" onClick={handleCancel}><DisabledByDefaultIcon /></IconButton>
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
