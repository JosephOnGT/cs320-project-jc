import React, { useState } from 'react';
import './App.css';  // Assuming your common styles are in App.css

function Page3() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    // Function to add item to wishlist
    const addItem = () => {
        if (newItem) {
            setWishlistItems([...wishlistItems, newItem]);
            setNewItem('');
        }
    };

    // Function to remove item from wishlist
    const removeItem = (index) => {
        const updatedWishlist = wishlistItems.filter((_, i) => i !== index);
        setWishlistItems(updatedWishlist);
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
                    placeholder="Add a new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            {/* Display wishlist items */}
            <div className="wishlist">
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <ul>
                        {wishlistItems.map((item, index) => (
                            <li key={index} className="wishlist-item">
                                {item}
                                <button onClick={() => removeItem(index)} className="remove-btn">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Page3;