
import { useEffect, useRef } from 'react';
import QuillEditor from './QuillEditor';

function ChatEditor({ message, setMessage, readOnly }) {
    const quillRef = useRef();

    const handleTextMessageChange = () => {
        setMessage(quillRef.current.getText());
    }

    useEffect(() => {
        if (!message)
            quillRef.current.setText(message);
    }, [message]);

    return (
        <QuillEditor
            ref={quillRef}
            readOnly={readOnly}
            value={message}
            onTextChange={handleTextMessageChange}
        />
    );
}

export default ChatEditor;