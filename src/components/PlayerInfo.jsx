import { useState } from "react";

export default function Player({intitalName, symbol, isActive, onChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(intitalName);

    function handleEditClick(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleNameChange(event){
        setPlayerName(event.target.value);
    }

    let btnEdit = "Edit";
    if(isEditing){
        btnEdit = "Save";
        
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ? 
                (<input type="text" placeholder="enter name" required value={playerName} onChange={handleNameChange}/>) 
                : (<span className="player-name">{playerName}</span>)}

                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnEdit}</button>
        </li>
    );
}