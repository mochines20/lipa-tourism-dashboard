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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [landmarksRes, visitsRes, trendsRes] = await Promise.all([
                    fetch('http://localhost/lipa-tourism-dashboard/api/landmarks.php'),
                    fetch('http://localhost/lipa-tourism-dashboard/api/visits.php'),
                    fetch('http://localhost/lipa-tourism-dashboard/api/visitor-trends.php')
                ]);

                const landmarks = await landmarksRes.json();
                const visits = await visitsRes.json();
                const trends = await trendsRes.json();

                setLandmarksData(landmarks);
                setVisitsData(visits);
                setTrendsData(trends);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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