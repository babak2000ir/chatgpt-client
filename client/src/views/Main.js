import DynamicList from './components/DynamicList';
import MessageCard from './components/MessageCard';
import { useState } from 'react';
import { fetchCall } from '../services/fetchSvc';

function Main() {
    const [stopPhrasesList, setStopPhrasesList] = useState([]);
    const [numberOfResponses, setNumberOfResponses] = useState(1);
    const [frequencyPenalty, setFrequencyPenalty] = useState(0);
    const [temperature, setTemperature] = useState(1);
    const [topP, setTopP] = useState(1);
    const [presencePenalty, setPresencePenalty] = useState(0);
    const [seed, setSeed] = useState(0);
    const [logprobs, setLogprobs] = useState(false);
    const [topLogprobs, setTopLogprobs] = useState(0);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: 'You are a flirty girl who has a crush on me and you are trying to get my attention by mentioning saucy things about yourself',
            name: 'Sue'
        }
    ]);

    const handleSendMessage = () => {
        if (message) {
            sendMessage()
                .then(response => {
                    setMessages([
                        ...messages,
                        { role: 'user', content: message, name: 'Babak' },
                        { role: 'assistant', content: response.reply, name: 'Sue', details: response }
                    ]);
                    setMessage('');
                })
        }
    }

    const getMessagesObject = () => {
        const messagesObject = [
            ...messages.map(message => {
                return { role: message.role, content: message.content, name: message.name };
            }),
            { role: 'user', content: message, name: 'Babak' }
        ];
        return messagesObject;
    }

    const sendMessage = async () => {
        const requestBody = {
            messages: getMessagesObject(),
            stop: stopPhrasesList,
            n: numberOfResponses,
            frequency_penalty: frequencyPenalty,
            temperature,
            top_p: topP,
            presence_penalty: presencePenalty,
            seed,
            logprobs
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

    return (
        <div>
            <div className="container">
                <div className="container p-2">
                    <div><h1>Advanced Chat Client</h1></div>
                </div>
            </div>

            <div className="container">
                <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Parameters
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="n">Number of Responses</span>
                                    <input type="number" className="form-control" placeholder="n" aria-label="N" aria-describedby="n" defaultValue="1" min="1" max="5" step="1" value={numberOfResponses} onChange={e => setNumberOfResponses(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="frequency_penalty">Frequency Penalty</span>
                                    <input type="number" className="form-control" placeholder="Frequency Penalty" aria-label="Frequency Penalty" aria-describedby="frequency_penalty" defaultValue="0" min="-2" max="2" step="0.1" value={frequencyPenalty} onChange={e => setFrequencyPenalty(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="temperature">Temprature</span>
                                    <input type="number" className="form-control" placeholder="Temperature" aria-label="Temperature" aria-describedby="temperature" defaultValue="1" min="0" max="1" step="0.1" value={temperature} onChange={e => setTemperature(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="top_p">Top P</span>
                                    <input type="number" className="form-control" placeholder="Top P" aria-label="Top P" aria-describedby="top_p" defaultValue="1" min="0" max="1" step="0.1" value={topP} onChange={e => setTopP(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="presence_penalty">Presence Penalty</span>
                                    <input type="number" className="form-control" placeholder="Presence Penalty" aria-label="Presence Penalty" aria-describedby="presence_penalty" defaultValue="0" min="-2" max="2" step="0.1" value={presencePenalty} onChange={e => setPresencePenalty(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="seed">Seed</span>
                                    <input type="text" className="form-control" placeholder="Seed" aria-label="Seed" aria-describedby="seed" length="30" value={seed} onChange={e => setSeed(e.target.value)} />
                                </div>

                                <div className="input-group mb-3">
                                    <DynamicList name="Stop" valueList={stopPhrasesList} setValueList={setStopPhrasesList} />
                                </div>

                                <div className="input-group mb-3 form-check">
                                    <input className="form-check-input" type="checkbox" id="logprobs" value={logprobs} onChange={e => setLogprobs(e.target.checked)} />
                                    <label className="form-check-label" for="logprobs">
                                        &nbsp;Log Probs
                                    </label>
                                </div>

                                {logprobs &&
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="top_logprobs">Top Log Probs</span>
                                        <input type="number" className="form-control" placeholder="Top Log Probs" aria-label="Top Log Probs" aria-describedby="top_logprobs" defaultValue="0" min="0" max="20" step="1" value={topLogprobs} onChange={e => setTopLogprobs(e.target.value)} />
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Chat
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="container border mb-1 pb-2">
                                    <div className='d-flex'><span className="fw-bold">System Messages</span></div>
                                    {messages.filter(message => message.role === 'system').map((message, idx) =>
                                        <MessageCard
                                            key={idx}
                                            messageIdx={messages.indexOf(message)}
                                            message={message}
                                            setSingleMessage={setSingleMessage}
                                            colorClassName={'bg-light'} />
                                    )}
                                </div>
                                <div className="container border overflow-auto" style={{ height: 550, paddingTop: 5 }}>
                                    {messages.filter(message => message.role !== 'system').map((message, idx) =>
                                        <MessageCard
                                            key={idx}
                                            messageIdx={messages.indexOf(message)}
                                            message={message}
                                            setSingleMessage={setSingleMessage}
                                            justifyClassName={message.role === 'assistant' ? 'justify-content-start' : 'justify-content-end'}
                                            colorClassName={message.role === 'assistant' ? 'text-dark bg-light' : ''} />
                                    )}
                                </div>
                                <div className="container border mt-1">
                                    <label for="textArea" class="form-label">Your Message:</label>
                                    <div class="input-group">
                                        <textarea class="form-control mb-1" id="textArea" rows="3" value={message} onChange={e => setMessage(e.target.value)} onKeyUp={e => e.key === 'Enter' ? handleSendMessage() : ""}></textarea>
                                        <button class="btn btn-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>Send</button>
                                    </div>
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