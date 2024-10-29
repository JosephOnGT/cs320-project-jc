import React, { useState, useEffect } from 'react';
import './App.css';  // Assuming consistent styling is applied here

function Page4() {
    const [users, setUsers] = useState([]);  // State to hold the user data
    const [groups, setGroups] = useState([]);  // State to hold the groups data
    const [error, setError] = useState('');  // State to handle any errors
    const [showUsers, setShowUsers] = useState(false);  // State to toggle user display
    const [showGroups, setShowGroups] = useState(false);  // State to toggle group display
    const [loading, setLoading] = useState(false);  // State for loading indicator

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        setLoading(true);  // Start loading
        try {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);  // Set the fetched user data
            setError('');  // Clear any previous errors
            setShowUsers(true);  // Set state to show users
            setShowGroups(false);  // Hide groups when fetching users
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
            setShowUsers(false);  // Hide users if there’s an error
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Function to fetch groups from the backend
    const fetchGroups = async () => {
        setLoading(true);  // Start loading
        try {
            const response = await fetch('http://localhost:8080/groups');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setGroups(data);  // Set the fetched group data
            setError('');  // Clear any previous errors
            setShowGroups(true);  // Set state to show groups
            setShowUsers(false);  // Hide users when fetching groups
        } catch (error) {
            console.error('Error fetching groups:', error);
            setError('Error fetching groups. Please try again later.');
            setShowGroups(false);  // Hide groups if there’s an error
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Function to handle refreshing the user list and error message
    const handleRefresh = () => {
        setUsers([]);  // Clear the users list
        setGroups([]);  // Clear the groups list
        setError('');  // Clear any displayed error
        setShowUsers(false);  // Hide users
        setShowGroups(false);  // Hide groups
        fetchUsers();  // Fetch the user list again
    };

    // Use effect to fetch users on component mount
    useEffect(() => {
        fetchUsers();  // Fetch users initially when the component mounts
    }, []);

    return (
        <div className="container">
            <h1>Group Management</h1>

            {/* Card container for listing existing groups and viewing users */}
            <div className="card-container">
                {/* List Existing Groups Card */}
                <div className="card">
                    <i className="fas fa-list fa-3x card-icon"></i>
                    <h2>List Existing Groups</h2>
                    <button onClick={fetchGroups}>View Groups</button> {/* Fetch groups when clicked */}
                </div>

                {/* View Users Card */}
                <div className="card">
                    <i className="fas fa-users fa-3x card-icon"></i>
                    <h2>View Users</h2>
                    <button onClick={fetchUsers} disabled={loading}>
                        {loading ? 'Loading...' : 'See Users'}
                    </button>
                </div>
            </div>

            {/* Refresh Button */}
            <div className="refresh-button-container">
                <button onClick={handleRefresh} className="refresh-button">Refresh</button>
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
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Displaying the list of groups if showGroups is true */}
            {showGroups && (
                <div className="group-list-container">
                    <h2>Existing Groups</h2>
                    <ul className="group-list">
                        {groups.map(group => (
                            <li key={group.id}>
                                <span>{group.groupName} - Budget: ${group.budget}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Page4;