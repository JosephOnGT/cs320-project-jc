import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';  // Import the CSS file for styling

function App() {
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [error, setError] = useState('');  // Error state for handling validation errors

    // Frontend validation function
    const validateInput = () => {
        if (!firstName) {
            return "First Name cannot be empty.";
        }

        const regex = /^[A-Za-z]+$/;  // Regex to check for letters only
        if (!regex.test(firstName)) {
            return "First Name cannot contain numbers or special characters.";
        }

        return null;  // No validation errors
    };

    const submitName = async () => {
        // Run frontend validation first
        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            setMessage('');  // Clear any success message
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/submit-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: firstName }),  // Sending the firstName as "name"
            });

            if (!response.ok) {
                // If the response is not OK, extract and show the error message from the backend
                const errorMessage = await response.text();
                setError(errorMessage);
                setMessage('');  // Clear the success message
            } else {
                // On success, show the success message and clear any errors
                const successMessage = await response.text();
                setMessage(successMessage);
                setError('');  // Clear any error message
            }
        } catch (err) {
            // Handle any unexpected errors
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

            <button onClick={submitName}>Submit</button>

            {/* Show error message if there is one */}
            {error && <p className="error">{error}</p>}

            {/* Show success message */}
            <p>{message}</p>
        </div>
    );
}

export default App;