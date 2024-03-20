import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(editing => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    const editablePlayerName = isEditing
        ? <input type="text" required value={playerName} onChange={handleChange}></input>
        : <span className="player-name">{playerName}</span>

    const buttonCaption = isEditing
        ? <button onClick={handleEditClick}>Save</button>
        : <button onClick={handleEditClick}>Edit</button>

    return <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        {buttonCaption}
    </li>
}