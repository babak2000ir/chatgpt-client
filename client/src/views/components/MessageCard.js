
import { JSONTree } from 'react-json-tree';
import { useState, useRef } from 'react';
import useDocumentClick from '../../hooks/useDocumentClick';

function MessageCard({ message, messageIdx, setSingleMessage, justifyClassName = '', colorClassName = '' }) {
    const cardRef = useRef();
    const [collapseDetails, setCollapseDetails] = useState(true);
    const [collapseEdit, setCollapseEdit] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState(message.content);

    const handleDeleteButton = () => {
        setSingleMessage(messageIdx, null);
    }

    const handleEditButton = () => {
        saveMessage();
    }

    const saveMessage = () => {
        setCollapseEdit(!collapseEdit);
        if (!collapseEdit) {
            setSingleMessage(messageIdx, {
                ...message,
                content: textAreaValue
            });
        }
    }

    const handleTextAreaKeyUp = (event) => {
        if (event.key === 'Escape') {
            setTextAreaValue(message.content);
            setCollapseEdit(!collapseEdit);
        }
    }

    const handleDoubleClick = () => {
        if (collapseEdit)
            setCollapseEdit(!collapseEdit);
    }

    useDocumentClick((event) => {
        if (cardRef.current) {
            if (!event.composedPath().includes(cardRef.current)) {
                if (!collapseEdit) {
                    saveMessage()
                }
            }
        }
    });

    return (
        <div ref={cardRef} onDoubleClick={handleDoubleClick}>
            {message.role !== 'system' && <div className={`d-flex ${justifyClassName}`}><span className="fw-bold">{message.name}</span></div>}
            <div className={`${collapseEdit && 'd-flex'} ${justifyClassName} `}>
                <div className={`${collapseEdit && 'd-inline-flex'}`}>
                    <div className="card">
                        <div className={`card-body py-2 px-1 border rounded ${colorClassName}`}>
                            {collapseEdit ?
                                <p><span style={{ whiteSpace: 'pre-wrap' }}>{`${message.content}`}</span></p>
                                :
                                <div className="form-floating input-group">
                                    <textarea
                                        className="form-control mb-1"
                                        id="textArea"
                                        rows="3"
                                        value={textAreaValue}
                                        onChange={e => setTextAreaValue(e.target.value)}
                                        style={{ height: '100px' }}
                                        onKeyUp={handleTextAreaKeyUp} />
                                    <button className="btn btn-secondary" type="button" id="button-addon2">Send</button>
                                </div>}
                            <div className="d-flex flex-row">
                                <div className="d-flex me-auto">
                                    <div className="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={handleEditButton}>
                                        <i className="bi bi-pen"></i>
                                    </div>
                                </div>

                                {message.details &&
                                    <div className="d-flex">
                                        <div className="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={() => setCollapseDetails(!collapseDetails)}>
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </div>
                                    </div>}
                                {message.role !== 'system' &&
                                    <div className="d-flex">
                                        <div className="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={() => handleDeleteButton()}>
                                            <i className="bi bi-trash"></i>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        {message.details && !collapseDetails &&
                            <div className="card-footer">
                                <JSONTree data={message.details} theme={defaultTheme} invertTheme={false} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const defaultTheme = {
    scheme: 'light',
    author: 'custom',
    base00: '#f8f8f8', // Background
    base01: '#e8e8e8',
    base02: '#d8d8d8',
    base03: '#b8b8b8',
    base04: '#585858', // Comments
    base05: '#383838', // Foreground (text)
    base06: '#282828',
    base07: '#181818', // Very dark for contrast
    base08: '#ab4642', // Red (variables, tags)
    base09: '#dc9656', // Orange (warnings)
    base0A: '#f7ca88', // Yellow (numbers, booleans)
    base0B: '#ff1717', // Green (strings, key values)
    base0C: '#86c1b9', // Aqua/Cyan (regex, escape chars)
    base0D: '#000000', // Blue (functions, methods)
    base0E: '#ba8baf', // Purple (keywords, operators)
    base0F: '#a16946'  // Brown (deprecated)
};

export default MessageCard;