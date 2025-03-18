
import { useState } from 'react';

function ChatEditor({ addMessages, sendMessage, selectedCharacter }) {
    const [message, setMessage] = useState('');
    const [inProgress, setInProgress] = useState(false);

    const handleSendMessage = () => {
        setInProgress(true);

        const messageObject = {
            role: 'assistant',
            content: message.trim() ? selectedCharacter ? `[[${selectedCharacter}]]: ${message.trim()}` : message.trim() : ''
        };

        sendMessage(messageObject)
            .then(response => {
                const messagesToAdd = [];

                if (messageObject.content) {
                    messagesToAdd.push(messageObject);
                    setMessage('');
                }

                messagesToAdd.push({ role: 'assistant', content: response.reply, details: response });
                addMessages(messagesToAdd);
                setInProgress(false);
            })
            .catch(error => {
                console.error('Error sending message:', error);
                setInProgress(false);
            });

    }

    const handleTextAreaChange = (e) => {
        if (e.target.value.slice(-1) === '\n')
            return;
        setMessage(e.target.value);
    }

    const handleTextAreaOnKeyUp = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <>
            <label htmlFor="textArea" className="form-label fw-bold">'s Message:</label>
            <div className="pb-1">
                <textarea
                    className="form-control mb-2"
                    id="textArea"
                    rows="3"
                    disabled={inProgress}
                    value={message}
                    onChange={handleTextAreaChange}
                    onKeyUp={handleTextAreaOnKeyUp}>
                </textarea>
                <div className="d-flex justify-content-end pe-2">
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        id="button-addon2"
                        disabled={inProgress}
                        onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatEditor;