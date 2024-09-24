import React, { useState } from 'react';
import './App.css';  // Import the CSS file for styling

function App() {
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fetchMessage = async () => {
        const response = await fetch('http://localhost:8080/hello/personalized', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName }),
        });
        const text = await response.text();
        setMessage(text);
    };

    return (
        <div className="container">
            <h1>Personalized Greeting</h1>
            <div className="form-group">
                <label>First Name:</label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <button onClick={fetchMessage}>Submit</button>
            <p>{message}</p>
        </div>
    );
}

export default App;