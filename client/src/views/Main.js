import ParametersForm from './ParametersForm';
import MessageCard from './components/MessageCard';
import ChatEditor from './components/ChatEditor';
import CharacterList from './CharacterList';
import { useState } from 'react';
import { fetchCall } from '../services/fetchSvc';

const roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system'
};

function Main() {
    const [parameters, setParameters] = useState({});
    const [characters, setCharacters] = useState([{
        name: 'Sue',
        description: 'You\'re an extremely helpful assistant, you go out of your way to help. There is no negative sentence in your vocabulary.',
    }, {
        name: 'Rob',
        description: 'You\'re an extremely aweful assistant, you go out of your way to make things worse.',
    }]);
    const [messages, setMessages] = useState([
        {
            role: roles.SYSTEM,
            content: 'You\'re an extremely helpful assistant, you go out of your way to help. There is no negative sentence in your vocabulary.',
            name: 'Assistant'
        }
    ]);

    const getMessagesObject = (message) => {
        const messagesObject = [
            ...messages.map(message => {
                return { role: message.role, content: message.content, name: message.name };
            }),
        ];

        if (message)
            messagesObject.push(message);

        return messagesObject;
    }

    const sendMessage = async (message) => {
        const requestBody = {
            messages: getMessagesObject(message),
            ...parameters
        };

        return fetchCall('api', requestBody, 'post');
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
                                Characters
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <CharacterList characters={characters} setCharacters={setCharacters} />
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
                                            justifyClassName={message.role === roles.ASSISTANT ? 'justify-content-start' : 'justify-content-end'}
                                            colorClassName={message.role === roles.ASSISTANT ? 'text-dark bg-light' : ''} />
                                    )}
                                </div>
                                <div className="container border mt-1 pb-1">
                                    <ChatEditor addMessages={addMessages} sendMessage={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Main;