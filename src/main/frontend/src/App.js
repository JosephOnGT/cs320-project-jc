import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';  // Import the CSS file for styling

function App() {
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Initialize useNavigate hook
    const navigate = useNavigate();

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

    // // Function to navigate to page2
    // const navigateToPage2 = () => {
    //     navigate('/page2');
    // };

    return (
        <div className="container">
            <h1>Secret Santa App</h1>
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

            {/*/!* Button to navigate to Page 2 *!/*/}
            {/*<button onClick={navigateToPage2}>Go to Page 2</button>*/}
        </div>
    );
}

export default App;