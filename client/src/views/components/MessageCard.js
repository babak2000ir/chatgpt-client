
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
        <div ref={cardRef}>
            {message.role !== 'system' && <div className={`d-flex ${justifyClassName}`}><span className="fw-bold">{message.name}</span></div>}
            <div className={`${collapseEdit && 'd-flex'} ${justifyClassName} `}>
                <div className={`${collapseEdit && 'd-inline-flex'}`}>
                    <div className="card">
                        <div className={`card-body py-2 px-1 border rounded ${colorClassName}`}>
                            {collapseEdit ?
                                <p>{`${message.content}`}</p>
                                : <>
                                    <div class="form-floating input-group">
                                        <textarea class="form-control mb-1" id="textArea" rows="3" value={textAreaValue} onChange={e => setTextAreaValue(e.target.value)} style={{ height: '100px' }}></textarea>
                                        <button class="btn btn-secondary" type="button" id="button-addon2">Send</button>
                                    </div>
                                </>}
                            <div class="d-flex flex-row">
                                <div class="d-flex me-auto">
                                    <div class="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={handleEditButton}>
                                        <i class="bi bi-pen"></i>
                                    </div>
                                </div>

                                {message.details &&
                                    <div class="d-flex">
                                        <div class="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={() => setCollapseDetails(!collapseDetails)}>
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                    </div>}
                                {message.role !== 'system' &&
                                    <div class="d-flex">
                                        <div class="btn btn-outline-secondary btn-sm border-0" type="button" aria-expanded="false" onClick={() => handleDeleteButton()}>
                                            <i class="bi bi-trash"></i>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        {message.details && !collapseDetails &&
                            <div class="card-footer">
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