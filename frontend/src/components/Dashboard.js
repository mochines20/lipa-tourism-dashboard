import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [landmarksData, setLandmarksData] = useState([]);
    const [visitsData, setVisitsData] = useState([]);
    const [trendsData, setTrendsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = '/assets/images/landmarks/default.jpg';
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [landmarksRes, visitsRes, trendsRes] = await Promise.all([
                fetch('http://localhost/lipa-tourism-dashboard/api/landmarks.php'),
                fetch('http://localhost/lipa-tourism-dashboard/api/visits.php'),
                fetch('http://localhost/lipa-tourism-dashboard/api/visitor-trends.php')
            ]);

            // Check if any response is not ok
            if (!landmarksRes.ok || !visitsRes.ok || !trendsRes.ok) {
                throw new Error('Failed to fetch data from one or more endpoints');
            }

            const landmarks = await landmarksRes.json();
            const visits = await visitsRes.json();
            const trends = await trendsRes.json();

            // Validate data
            if (!Array.isArray(landmarks) || !Array.isArray(visits) || !Array.isArray(trends)) {
                throw new Error('Invalid data format received from server');
            }

            // Ensure all landmarks have an image URL
            const processedLandmarks = landmarks.map(landmark => ({
                ...landmark,
                image_url: landmark.image_url || 'default.jpg'
            }));

            setLandmarksData(processedLandmarks);
            setVisitsData(visits);
            setTrendsData(trends);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);

            // Implement retry mechanism
            if (retryCount < maxRetries) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchData();
                }, 2000 * (retryCount + 1)); // Exponential backoff
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [retryCount]);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3">Loading dashboard data...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                    {retryCount < maxRetries && (
                        <span className="block sm:inline mt-2">
                            Retrying... (Attempt {retryCount + 1} of {maxRetries})
                        </span>
                    )}
                    {retryCount >= maxRetries && (
                        <button
                            onClick={() => {
                                setRetryCount(0);
                                fetchData();
                            }}
                            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // No data state
    if (!landmarksData.length || !visitsData.length || !trendsData.length) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">No Data Available</strong>
                    <span className="block sm:inline"> There is no data to display at the moment.</span>
                </div>
            </div>
        );
    }

    const barChartData = {
        labels: landmarksData.map(landmark => landmark.name),
        datasets: [{
            label: 'Visits per Landmark',
            data: landmarksData.map(landmark => 
                visitsData.filter(visit => visit.landmark_id === landmark.id).length
            ),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const lineChartData = {
        labels: trendsData.map(trend => new Date(trend.date).toLocaleDateString()),
        datasets: [{
            label: 'Daily Visits',
            data: trendsData.map(trend => trend.visit_count),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };

    const pieChartData = {
        labels: landmarksData.map(landmark => landmark.name),
        datasets: [{
            data: landmarksData.map(landmark => 
                visitsData.filter(visit => visit.landmark_id === landmark.id).length
            ),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
        }],
    };

    const radarChartData = {
        labels: landmarksData.map(landmark => landmark.name),
        datasets: [{
            label: 'Visitor Distribution',
            data: landmarksData.map(landmark => 
                visitsData.filter(visit => visit.landmark_id === landmark.id).length
            ),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lipa City Tourism Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Visits per Landmark</h2>
                    <Bar data={barChartData} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Daily Visit Trends</h2>
                    <Line data={lineChartData} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Visitor Distribution</h2>
                    <Pie data={pieChartData} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Landmark Popularity</h2>
                    <Radar data={radarChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 