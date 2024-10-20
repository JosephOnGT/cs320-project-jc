import React, { useEffect, useState } from 'react';
import './App.css';  // Assuming your common styles are in App.css

function Page3() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch existing wishlist items when the component mounts
    useEffect(() => {
        fetchWishlists();
    }, []);

    // Function to fetch wishlist items from the backend
    const fetchWishlists = async () => {
        try {
            const response = await fetch('http://localhost:8080/wishlists');
            if (!response.ok) {
                throw new Error('Failed to fetch wishlists');
            }
            const data = await response.json();
            setWishlistItems(data);
        } catch (err) {
            setError('Failed to fetch wishlist items.');
        }
    };

    // Function to add item to wishlist
    const addItem = async () => {
        if (!newItemName) {
            setError('Item name cannot be empty.');
            return;
        }

        const newItem = { itemName: newItemName, description: newItemDescription };
        try {
            const response = await fetch('http://localhost:8080/wishlists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to wishlist');
            }

            setSuccessMessage('Item added successfully!');
            fetchWishlists(); // Refresh the list after adding
            setNewItemName(''); // Clear the input fields
            setNewItemDescription('');
        } catch (err) {
            setError('Failed to add item to wishlist.');
        }
    };

    // Function to remove item from wishlist
    const removeItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/wishlists/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from wishlist');
            }

            setSuccessMessage('Item removed successfully!');
            fetchWishlists(); // Refresh the list after removing
        } catch (err) {
            setError('Failed to remove item from wishlist.');
        }
    };

    return (
        <div className="container">
            <h1>Your Wishlist</h1>

            {/* Add an image above the wishlist */}
            <img src="/wishlist-image.jpg" alt="Wishlist" className="wishlist-image" />

            {/* Input to add new item */}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            {/* Show error and success messages */}
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            {/* Display wishlist items */}
            <div className="wishlist">
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <ul>
                        {wishlistItems.map((item) => (
                            <li key={item.id} className="wishlist-item">
                                {item.itemName}: {item.description}
                                <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Page3;