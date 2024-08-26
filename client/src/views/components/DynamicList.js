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
            <div class="form-group">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder={name} aria-label="Add 'Stop tokens'" aria-describedby={name} value={textBoxValue} onChange={e => setTextBoxValue(e.target.value)} onKeyUp={e => e.key === 'Enter' ? addValue() : ""} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={addValue}>Add</button>
                    </div>
                </div>
                <ul class="list-group">
                    {valueList.map((value, idx) => (
                        <li key={idx} href="#" class="list-group-item list-group-item-action">{value}<span><button type="button" class="btn-close float-end" aria-label="Close" onClick={() => removeValue(value)}></button></span></li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default DynamicList;