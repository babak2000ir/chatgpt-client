import { useState, useRef } from 'react';
import useDocumentClick from '../hooks/useDocumentClick';

function DefinitionMessagesList({ definitionMessages, setDefinitionMessages }) {
    const [newMessage, setNewMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const updateMessage = (idx, message) => {
        setDefinitionMessages([
            ...definitionMessages.slice(0, idx),
            message,
            ...definitionMessages.slice(idx + 1)
        ])
    }
    const removeMessage = (idx) => {
        setDefinitionMessages([
            ...definitionMessages.slice(0, idx),
            ...definitionMessages.slice(idx + 1)
        ])
    }

    const handleNewMessage = () => {
        if (newMessage) {
            setDefinitionMessages([...definitionMessages, newMessage]);
            setNewMessage('');
        }
    }

    return (
        <div className="mb-4">
            <ul className="list-group mb-1">
                {(definitionMessages.length !== 0) &&
                    definitionMessages.map((message, idx) => (
                        <Message
                            key={idx}
                            message={message}
                            removeMessage={() => removeMessage(idx)}
                            setMessage={(updatedMessage) => updateMessage(idx, updatedMessage)} />
                    ))
                }
            </ul>
            <div>
                <textarea
                    className={`${isFocused && 'border border-dark'} form-control`}
                    id="description"
                    rows="5"
                    value={newMessage}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={e => setNewMessage(e.target.value)} />
                <button className="btn btn-primary mt-2" onClick={handleNewMessage}>
                    Add Message
                </button>
            </div>
        </div>
    );
}

function Message({ message, setMessage, removeMessage }) {
    const cardRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        if (!isEditing)
            setIsEditing(!isEditing);
    }

    useDocumentClick((event) => {
        if (cardRef.current) {
            if (!event.composedPath().includes(cardRef.current)) {
                if (isEditing) {
                    setIsEditing(!isEditing);
                }
            }
        }
    });

    const handleKeyUp = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(!isEditing)
        }
    }

    return (
        <li ref={cardRef} className="list-group-item" onDoubleClick={handleDoubleClick} >
            <button
                className="btn btn-close position-absolute top-0 end-0 m-1"
                onClick={() => removeMessage()}
                aria-label="Close">
            </button>
            {isEditing ?
                <div className="d-flex">
                    <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyUp={handleKeyUp} />
                </div> :
                <div className="d-flex"><span style={{ whiteSpace: 'pre-wrap' }}>{message}</span></div>
            }
        </li>

    );
}

export default DefinitionMessagesList;