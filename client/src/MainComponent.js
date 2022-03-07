import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

export const MainComponent = () => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState('');
    
    const getAllNumbers = useCallback(async () => {
        const values = await axios.get("/api/values/all")
        setValues(values.data.rows)
    }, []);

    const saveNumber = useCallback( async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            value
        })
        setValue('');
    }, [value, setValue]);

    useEffect(() => {
        getAllNumbers();
    }, [saveNumber]);
    
    return (
        <>
            <h1>Home</h1>
            <div>
                <button onClick={getAllNumbers}>Get all numbers</button>
                <p>values</p>
                <ul>
                    {values.map((value, index) => <li key={index}>{value.number}</li>)}
                </ul>
                <form onSubmit={saveNumber}>
                    <label>Enter your value</label>
                    <input value={value} onChange={(event)=>{setValue(event.target.value)}}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}
