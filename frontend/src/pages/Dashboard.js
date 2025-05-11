import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';

const Dashboard = () => {
    const [landmarksData, setLandmarksData] = useState([]);
    const [visitsData, setVisitsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const landmarksResponse = await fetch('/api/landmarks');
                const visitsResponse = await fetch('/api/visits');
                const landmarks = await landmarksResponse.json();
                const visits = await visitsResponse.json();
                
                setLandmarksData(landmarks);
                setVisitsData(visits);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lipa City Tourism Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Landmarks Overview</h2>
                    <Chart data={landmarksData} type="bar" />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Visits Overview</h2>
                    <Chart data={visitsData} type="line" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;