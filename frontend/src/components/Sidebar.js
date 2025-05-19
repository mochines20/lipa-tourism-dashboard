import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Lipa Tourism</h1>
            </div>
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/landmarks" className="block p-2 hover:bg-gray-700 rounded">
                            Landmarks
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/visits" className="block p-2 hover:bg-gray-700 rounded">
                            Visit Statistics
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/trends" className="block p-2 hover:bg-gray-700 rounded">
                            Trends
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar; 