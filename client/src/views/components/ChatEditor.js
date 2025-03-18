
import { useState, useRef } from 'react';
import QuillEditor from './QuillEditor';

function ChatEditor({ message, setMessage, readOnly }) {
    const quillRef = useRef();

    const handleTextMessageChange = () => {
        setMessage(quillRef.current.getText());
    }

    return (
        <QuillEditor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={message}
            onTextChange={handleTextMessageChange}
        />
    );
}

export default ChatEditor;