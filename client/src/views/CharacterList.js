import { useState, useRef } from 'react';
import useDocumentClick from '../hooks/useDocumentClick';

function CharacterList({ characters, setCharacters }) {
    const handleSetCharacter = (characterIdx, character) => {
        setCharacters([
            ...characters.slice(0, characterIdx),
            character,
            ...characters.slice(characterIdx + 1)
        ])
    }

    return (
        <div className="mb-4">
            <ul className="list-group">
                {(characters.length !== 0) &&
                    characters.map((character, idx) => (
                        <Character key={idx} character={character} setCharacter={(character) => handleSetCharacter(idx, character)} />
                    ))}
            </ul>
        </div>
    );
}

function Character({ character, setCharacter }) {
    const cardRef = useRef();
    const [isEditing, setIsEditing] = useState(false)

    const handleDoubleClick = () => {
        if (!isEditing)
            setIsEditing(!isEditing)
    }

    useDocumentClick((event) => {
        if (cardRef.current) {
            if (!event.composedPath().includes(cardRef.current)) {
                if (isEditing)
                    setIsEditing(!isEditing)
            }
        }
    });

    const handleKeyUp = (event) => {
        if (event.key === 'Escape')
            setIsEditing(!isEditing)
    }

    return (
        <li ref={cardRef} className="list-group-item" onDoubleClick={handleDoubleClick} >
            {isEditing ?
                <div>
                    <div className="d-flex col-4">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={character.name}
                            onChange={e => setCharacter({ ...character, name: e.target.value })}
                            onKeyUp={handleKeyUp} />
                    </div>
                    <div className="d-flex">
                        <textarea
                            className="form-control"
                            id="description"
                            rows="5"
                            value={character.description}
                            onChange={e => setCharacter({ ...character, description: e.target.value })}
                            onKeyUp={handleKeyUp} />
                    </div>
                </div> :
                <div>
                    <div className="d-flex"><strong>{character.name}:</strong></div>
                    <div className="d-flex"><span style={{ whiteSpace: 'pre-wrap' }}>{character.description}</span></div>
                </div>
            }
        </li>

    );
}

export default CharacterList;