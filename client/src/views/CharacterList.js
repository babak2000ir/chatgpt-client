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
                        <Character key={idx} character={character} characterIdx={characters.indexOf(character)} setCharacter={handleSetCharacter} />
                    ))}
            </ul>
        </div>
    );
}

function Character({ character, characterIdx, setCharacter }) {
    const cardRef = useRef();
    const [isEditing, setIsEditing] = useState(false)
    const [characterName, setCharacterName] = useState(character.name)
    const [characterDescription, setCharacterDescription] = useState(character.description)

    const handleDoubleClick = () => {
        if (isEditing) {
            setCharacter(characterIdx, {
                name: characterName,
                description: characterDescription
            })
        }
        else
            setIsEditing(!isEditing)
    }

    useDocumentClick((event) => {
        if (cardRef.current) {
            if (!event.composedPath().includes(cardRef.current)) {
                if (isEditing) {
                    setIsEditing(!isEditing)
                    setCharacter(characterIdx, {
                        name: characterName,
                        description: characterDescription
                    })
                }
            }
        }
    });

    const handleKeyUp = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(!isEditing)
            setCharacterName(character.name)
            setCharacterDescription(character.description)
        }
    }

    return (
        <li ref={cardRef} className="list-group-item" onDoubleClick={handleDoubleClick} >
            {isEditing ?
                <div>
                    <div className="d-flex col-4">
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            value={characterName}
                            onChange={e => setCharacterName(e.target.value)} 
                            onKeyUp={handleKeyUp}/>
                    </div>
                    <div className="d-flex">
                        <textarea
                            class="form-control"
                            id="description"
                            rows="5"
                            value={characterDescription}
                            onChange={e => setCharacterDescription(e.target.value)} 
                            onKeyUp={handleKeyUp}/>
                    </div>
                </div> :
                <div>
                    <div className="d-flex"><strong>{characterName}:</strong></div>
                    <div className="d-flex"><span style={{ whiteSpace: 'pre-wrap' }}>{characterDescription}</span></div>
                </div>
            }
        </li>

    );
}

export default CharacterList;