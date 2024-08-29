import { useState } from 'react';

function DynamicList({ name, valueList, setValueList }) {
    const [textBoxValue, setTextBoxValue] = useState('');

    const addValue = () => {
        if (textBoxValue && !valueList.includes(textBoxValue)) {
            setValueList([...valueList, textBoxValue]);
            setTextBoxValue('');
        }
    }

    const removeValue = (value) => {
        setValueList([...valueList].filter((item) => item !== value));
    }

    return (
        <>
            <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder={name} aria-label="Add 'Stop tokens'" aria-describedby={name} value={textBoxValue} onChange={e => setTextBoxValue(e.target.value)} onKeyUp={e => e.key === 'Enter' ? addValue() : ""} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={addValue}>Add</button>
                    </div>
                </div>
                <ul className="list-group">
                    {valueList.map((value, idx) => (
                        <li key={idx} href="#" className="list-group-item list-group-item-action">{value}<span><button type="button" className="btn-close float-end" aria-label="Close" onClick={() => removeValue(value)}></button></span></li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default DynamicList;