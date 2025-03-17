import { useState, useRef } from 'react';
import useDocumentClick from '../hooks/useDocumentClick';

function DefinitionMessagesList({ definitionMessages, setDefinitionMessages }) {
    const handleSetMessage = (idx, message) => {
        setDefinitionMessages([
            ...definitionMessages.slice(0, idx),
            message,
            ...definitionMessages.slice(idx + 1)
        ])
    }

    const handleAddMessage = (message) => {
        setDefinitionMessages([...definitionMessages, message])
    }

    return (
        <div className="mb-4">
            <ul className="list-group">
                {(definitionMessages.length !== 0) &&
                    definitionMessages.map((message, idx) => (
                        <Message key={idx} message={message} characterIdx={definitionMessages.indexOf(message)} setMessage={handleSetMessage} />
                    ))}
            </ul>
            <button className="btn btn-primary mt-2" onClick={() => handleAddMessage('New Message')}>
                Add Message
            </button>
        </div>
    );
}

function Message({ message, setMessage, idx }) {
    const cardRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [newMessage, setNewMessage] = useState(message);

    const handleDoubleClick = () => {
        if (isEditing) {
            setMessage(idx, newMessage)
        }
        else
            setIsEditing(!isEditing)
    }

    useDocumentClick((event) => {
        if (cardRef.current) {
            if (!event.composedPath().includes(cardRef.current)) {
                if (isEditing) {
                    setIsEditing(!isEditing);
                    setMessage(idx, newMessage);
                }
            }
        }
    });

    const handleKeyUp = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(!isEditing)
            setMessage(idx, newMessage);
        }
    }

    return (
        <li ref={cardRef} className="list-group-item" onDoubleClick={handleDoubleClick} >
            {isEditing ?
                <div className="d-flex">
                    <textarea
                        class="form-control"
                        id="description"
                        rows="5"
                        value={message}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyUp={handleKeyUp} />
                </div> :
                <div className="d-flex"><span style={{ whiteSpace: 'pre-wrap' }}>{message}</span></div>
            }
        </li>

    );
}

export default DefinitionMessagesList;