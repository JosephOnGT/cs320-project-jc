import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // We'll create this CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <span> </span>
                <Link to="/page2" className="nav-link">Groups</Link>
                <span> </span>
                <Link to="/page3" className="nav-link">Wishlist</Link>
                <span> </span>
                <Link to="/page4" className="nav-link">Group Management</Link>
            </div>
        </nav>
    );
};

export default Navbar;