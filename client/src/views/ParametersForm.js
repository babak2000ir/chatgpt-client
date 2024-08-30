import DynamicList from './components/DynamicList';
import { useState, useEffect } from 'react';

function ParametersForm({ setParameters }) {
    const [stopPhrasesList, setStopPhrasesList] = useState([]);
    const [numberOfResponses, setNumberOfResponses] = useState(1);
    const [frequencyPenalty, setFrequencyPenalty] = useState(0);
    const [temperature, setTemperature] = useState(1);
    const [topP, setTopP] = useState(1);
    const [presencePenalty, setPresencePenalty] = useState(0);
    const [seed, setSeed] = useState(0);
    const [logprobs, setLogprobs] = useState(false);
    const [topLogprobs, setTopLogprobs] = useState(0);

    useEffect(() => {
        setParameters({
            stop: stopPhrasesList,
            n: numberOfResponses,
            frequency_penalty: frequencyPenalty,
            temperature,
            top_p: topP,
            presence_penalty: presencePenalty,
            seed,
            logprobs
        })
    }, [stopPhrasesList, numberOfResponses, frequencyPenalty, temperature, topP, presencePenalty, seed, logprobs])

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="n">Number of Responses</span>
                <input type="number" className="form-control" placeholder="n" aria-label="N" aria-describedby="n" min="1" max="5" step="1" value={numberOfResponses} onChange={e => setNumberOfResponses(Number(e.target.value))} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="frequency_penalty">Frequency Penalty</span>
                <input type="number" className="form-control" placeholder="Frequency Penalty" aria-label="Frequency Penalty" aria-describedby="frequency_penalty" min="-2" max="2" step="0.1" value={frequencyPenalty} onChange={e => setFrequencyPenalty(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="temperature">Temprature</span>
                <input type="number" className="form-control" placeholder="Temperature" aria-label="Temperature" aria-describedby="temperature" min="0" max="1" step="0.1" value={temperature} onChange={e => setTemperature(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="top_p">Top P</span>
                <input type="number" className="form-control" placeholder="Top P" aria-label="Top P" aria-describedby="top_p" min="0" max="1" step="0.1" value={topP} onChange={e => setTopP(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="presence_penalty">Presence Penalty</span>
                <input type="number" className="form-control" placeholder="Presence Penalty" aria-label="Presence Penalty" aria-describedby="presence_penalty" min="-2" max="2" step="0.1" value={presencePenalty} onChange={e => setPresencePenalty(e.target.value)} />
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
                <label className="form-check-label" htmlFor="logprobs">
                    &nbsp;Log Probs
                </label>
            </div>

            {logprobs &&
                <div className="input-group mb-3">
                    <span className="input-group-text" id="top_logprobs">Top Log Probs</span>
                    <input type="number" className="form-control" placeholder="Top Log Probs" aria-label="Top Log Probs" aria-describedby="top_logprobs" min="0" max="20" step="1" value={topLogprobs} onChange={e => setTopLogprobs(e.target.value)} />
                </div>}
        </>
    );
}

export default ParametersForm;