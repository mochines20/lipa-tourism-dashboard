import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

const Chart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data'); // Adjust the API endpoint as needed
                const result = await response.json();
                setData({
                    labels: result.labels,
                    datasets: [
                        {
                            label: 'Landmarks Visits',
                            data: result.visits,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="chart-container">
                <h2 className="text-lg font-bold">Bar Chart</h2>
                <Bar data={data} />
            </div>
            <div className="chart-container">
                <h2 className="text-lg font-bold">Line Chart</h2>
                <Line data={data} />
            </div>
            <div className="chart-container">
                <h2 className="text-lg font-bold">Pie Chart</h2>
                <Pie data={data} />
            </div>
            <div className="chart-container">
                <h2 className="text-lg font-bold">Radar Chart</h2>
                <Radar data={data} />
            </div>
        </div>
    );
};

export default Chart;