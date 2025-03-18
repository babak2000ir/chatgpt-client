import ParametersForm from './ParametersForm';
import MessageCard from './components/MessageCard';
import ChatEditor from './components/ChatEditor';
import DefinitionMessagesList from './DefinitionMessagesList';
import { useState } from 'react';
import { fetchCall } from '../services/fetchSvc';

const roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system'
};

function MainOllama() {
    const [parameters, setParameters] = useState({});
    const [definitionMessages, setDefinitionMessages] = useState([
       "Instructions",
       "Character 1: Dana",
       "Character 2: Robert"
    ]);
    const [messages, setMessages] = useState([]);
    const [characters, setCharacters] = useState([
        "Dana",
        "Robert"
    ]);
    const [selectedCharacter, setSelectedCharacter] = useState(characters[0] || '');

    const getMessagesObject = (message) => {
        const messagesObject = [
            ...definitionMessages.map(message => ({ role: roles.SYSTEM, content: message })),
            ...messages.map(message => ({ role: message.role, content: message.content })),
        ];

        if (message.content) {
            messagesObject.push(message);
            if (selectedCharacter) {
                messagesObject.push({ role: roles.USER, content: `You're generating a message from [[${nextCharacter()}]], start the response with:\n[[${nextCharacter()}]]:` });
            }
        }
        else
            if (selectedCharacter) {
                messagesObject.push({ role: roles.USER, content: `You're generating a message from [[${selectedCharacter}]], start the response with:\n[[${selectedCharacter}]]:` });
            }

        return messagesObject;
    }

    const nextCharacter = () => {
        return characters[(characters.indexOf(selectedCharacter) + 1) % characters.length];
    }

    const getMessageCharacter = (message) => {
        return message.content.match(/\[\[(.*?)\]\]/);
    }

    const getCharacterJustification = (character) => {
        return characters.indexOf(character) % 2 ? 'justify-content-end' : 'justify-content-start';
    }

    const sendMessage = async (message) => {
        const requestBody = {
            messages: getMessagesObject(message),
            ...parameters
        };

        return fetchCall('ollamaApi/chat', requestBody, 'post')
            .then(response => {
                //setSelectedCharacter(nextCharacter());
                return response;
            });
    }

    const setSingleMessage = (idx, message) => {
        if (message)
            setMessages([
                ...messages.slice(0, idx),
                message,
                ...messages.slice(idx + 1)
            ])
        else
            setMessages([
                ...messages.slice(0, idx),
                ...messages.slice(idx + 1)
            ])
    }

    const addMessages = (messagesToSend) => {
        setMessages([
            ...messages,
            ...messagesToSend
        ]);
    }

    return (
        <div className="m-1 p-1">
            <div className="container">
                <div className="container p-2">
                    <div><h1>Advanced Chat Client</h1></div>
                </div>
            </div>

            <div className="container">
                <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item border">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Parameters
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <ParametersForm setParameters={setParameters} />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                System Messages
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <DefinitionMessagesList definitionMessages={definitionMessages} setDefinitionMessages={setDefinitionMessages} />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item border">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Chat
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">

                            <div className="accordion-body">
                                <div className="container border mb-1 pb-2">
                                    <div className='d-flex'><span className="fw-bold">System Messages</span></div>
                                    {messages.filter(message => message.role === roles.SYSTEM).map((message, idx) =>
                                        <MessageCard
                                            key={idx}
                                            messageIdx={messages.indexOf(message)}
                                            message={message}
                                            setSingleMessage={setSingleMessage}
                                            colorClassName={'bg-light'} />
                                    )}
                                </div>

                                <div className="container border overflow-auto" style={{ height: 550, paddingTop: 5 }}>
                                    {messages.filter(message => message.role !== roles.SYSTEM).map((message, idx) =>
                                        <MessageCard
                                            key={idx}
                                            messageIdx={messages.indexOf(message)}
                                            message={message}
                                            setSingleMessage={setSingleMessage}
                                            justifyClassName={getCharacterJustification(getMessageCharacter(message))}
                                            colorClassName={message.role === roles.ASSISTANT ? 'text-dark bg-light' : ''} />
                                    )}
                                </div>
                                <div className="container border mt-1 pb-1">
                                    <select onChange={(e) => setSelectedCharacter(e.target.value)} value={selectedCharacter}>
                                        {characters.map((character, idx) =>
                                            <option key={idx} defaultValue={selectedCharacter}>{character}</option>
                                        )}
                                    </select>
                                    <ChatEditor addMessages={addMessages} sendMessage={sendMessage} selectedCharacter={selectedCharacter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MainOllama;