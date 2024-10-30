import React, { useState, useEffect } from 'react';
import './App.css';

function Page4() {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [showGroups, setShowGroups] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            setError('');
            setShowUsers(true);
            setShowGroups(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
            setShowUsers(false);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch groups from the backend
    const fetchGroups = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/groups');
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setGroups(data);
            setError('');
            setShowGroups(true);
            setShowUsers(false);
        } catch (error) {
            console.error('Error fetching groups:', error);
            setError('Error fetching groups. Please try again later.');
            setShowGroups(false);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle refreshing the user list and error message
    const handleRefresh = async () => {
        setLoading(true);  // Start loading
        setUsers([]);  // Clear the users list
        setGroups([]);  // Clear the groups list
        setError('');  // Clear any displayed error
        setShowUsers(false);  // Hide users
        setShowGroups(false);  // Hide groups
        await fetchUsers();  // Await to ensure users are reloaded
        setLoading(false);  // Stop loading
    };

    // Use effect to fetch users on component mount
    useEffect(() => {
        fetchUsers();
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
                    <button onClick={fetchGroups} aria-label="View Groups">
                        View Groups
                    </button>
                </div>

                {/* View Users Card */}
                <div className="card">
                    <i className="fas fa-users fa-3x card-icon"></i>
                    <h2>View Users</h2>
                    <button onClick={fetchUsers} disabled={loading} aria-label="See Users">
                        {loading ? 'Loading...' : 'See Users'}
                    </button>
                </div>
            </div>

            {/* Refresh Button */}
            <div className="refresh-button-container">
                <button onClick={handleRefresh} className="refresh-button" aria-label="Refresh">
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
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