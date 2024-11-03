import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import { API_URL } from './config';

function App() {
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    // Frontend validation function
    const validateInput = () => {
        if (!firstName) {
            return "First Name cannot be empty.";
        }

        if (!lastName) {
            return "Last Name cannot be empty.";
        }

        const regex = /^[A-Za-z]+$/;
        if (!regex.test(firstName)) {
            return "First Name cannot contain numbers or special characters.";
        }

        if (!regex.test(lastName)) {
            return "Last Name cannot contain numbers or special characters.";
        }

        return null;
    };

    const submitName = async () => {
        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            setMessage('');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/hello/personalized`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setError(errorMessage);
                setMessage('');
            } else {
                const successMessage = await response.text();
                setMessage(successMessage);
                setError('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Secret Santa App</h1>

            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <button onClick={submitName}>Submit</button>

            {error && <p className="error">{error}</p>}
            <p>{message}</p>
        </div>
    );
}

export default App;