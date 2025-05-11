import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg font-bold">Lipa Tourism Dashboard</h1>
                <div>
                    <Link to="/" className="text-white px-4">Dashboard</Link>
                    <Link to="/about" className="text-white px-4">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;