import React from 'react';
import './App.css';  // Assuming consistent styling is applied here

function Page2() {
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
            </div>
        </div>
    );
}

export default Page2;