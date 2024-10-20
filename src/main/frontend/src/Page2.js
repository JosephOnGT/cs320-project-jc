import React, { useState } from 'react';
import './App.css';  // Assuming consistent styling is applied here

function Page2() {
    const [users, setUsers] = useState([]);  // State to hold the user data
    const [error, setError] = useState('');  // State to handle any errors
    const [showUsers, setShowUsers] = useState(false);  // State to toggle user display

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);  // Set the fetched user data
            setError('');  // Clear any previous errors
            setShowUsers(true);  // Set state to show users
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
            setShowUsers(false);  // Hide users if there’s an error
        }
    };

    return (
        <div className="container">
            <h1>Group Management</h1>

            {/* Two option cards: Create Group and List Existing Groups */}
            <div className="card-container">
                {/* Create Group Card */}
                <div className="card">
                    <i className="fas fa-users fa-3x card-icon"></i>
                    <h2>Create Group</h2>
                    <button>Create Group</button>
                </div>

                {/* List Existing Groups Card */}
                <div className="card">
                    <i className="fas fa-list fa-3x card-icon"></i>
                    <h2>List Existing Groups</h2>
                    <button>View Groups</button>
                </div>

                {/* View Users Card */}
                <div className="card">
                    <i className="fas fa-users fa-3x card-icon"></i>
                    <h2>View Users</h2>
                    <button onClick={fetchUsers}>See Users</button> {/* Button to fetch users */}
                </div>
            </div>

            {/* Displaying error if any */}
            {error && <p className="error">{error}</p>}

            {/* Displaying the list of users if showUsers is true */}
            {showUsers && (
                <div className="user-list-container">
                    <ul className="user-list">
                        {users.map(user => (
                            <li key={user.id}>
                                <span>{user.name} {user.lastName}</span>
                                {/* Optional button can be added here if needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Page2;