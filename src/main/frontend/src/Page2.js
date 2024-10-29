import React, { useState, useEffect } from 'react';
import './App.css';

function CreateGroupForm() {
    const [groupName, setGroupName] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedUser, setSelectedUser] = useState('');  // Single selected user
    const [groupUsers, setGroupUsers] = useState([]);  // List of users in the group
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch users for the dropdown
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8080/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        // Check if the user is already in the group
        if (groupUsers.includes(selectedUser) || selectedUser === '') return;

        setGroupUsers([...groupUsers, selectedUser]);
        setSelectedUser('');  // Reset the selected user
    };

    const handleCreateGroup = async () => {
        if (groupUsers.length < 2 || groupUsers.length % 2 !== 0) {
            setError("Group must have an even number of users and at least two members.");
            return;
        }
        setError('');

        const response = await fetch('http://localhost:8080/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupName, budget, userIds: groupUsers }),
        });

        if (response.ok) {
            alert("Group created successfully!");
            // Optionally reset the form after successful creation
            handleRefresh();
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    };

    const handleRefresh = () => {
        setGroupName('');
        setBudget('');
        setSelectedUser('');
        setGroupUsers([]);
        setError('');
    };

    return (
        <div className="card"> {/* Card container */}
            <h2>Create Group</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                className="group-name-input" // Updated input with class name
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
            />

            {/* User dropdown for adding users to the group */}
            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                <option value="">Select a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name} {user.lastName}
                    </option>
                ))}
            </select>
            <button onClick={handleAddUser}>Add User</button>

            {/* Display selected users */}
            <ul>
                {groupUsers.map(userId => {
                    const user = users.find(u => u.id === userId); // Find user by ID
                    return (
                        <li key={userId}>
                            {user ? `${user.name} ${user.lastName}` : 'Unknown User'}
                        </li>
                    );
                })}
            </ul>

            <button onClick={handleCreateGroup}>Create Group</button>
            <button onClick={handleRefresh}>Refresh</button> {/* Refresh button */}
        </div>
    );
}

export default CreateGroupForm;