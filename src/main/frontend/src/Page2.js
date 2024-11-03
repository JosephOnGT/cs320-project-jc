import React, { useState, useEffect } from 'react';
import './App.css';
import { API_URL } from './config';

function CreateGroupForm() {
    const [groupName, setGroupName] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`${API_URL}/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        if (groupUsers.includes(selectedUser) || selectedUser === '') return;

        setGroupUsers([...groupUsers, selectedUser]);
        setSelectedUser('');
    };

    const handleCreateGroup = async () => {
        if (groupUsers.length < 2 || groupUsers.length % 2 !== 0) {
            setError("Group must have an even number of users and at least two members.");
            return;
        }
        setError('');

        try {
            const response = await fetch(`${API_URL}/groups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    groupName,
                    budget: parseFloat(budget),  // Ensure budget is a number
                    userIds: groupUsers
                }),
            });

            if (response.ok) {
                alert("Group created successfully!");
                handleRefresh();
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error creating group:', error);
            setError("An error occurred while creating the group.");
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
        <div className="card">
            <h2>Create Group</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                className="group-name-input"
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

            <ul>
                {groupUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    return (
                        <li key={userId}>
                            {user ? `${user.name} ${user.lastName}` : 'Unknown User'}
                        </li>
                    );
                })}
            </ul>

            <button onClick={handleCreateGroup}>Create Group</button>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
}

export default CreateGroupForm;