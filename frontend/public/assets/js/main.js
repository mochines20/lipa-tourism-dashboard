import { chartConfigs, sampleData } from './charts.js';

// Fetch visitor data and update the chart
async function fetchVisitorData(timeRange = 'month') {
    try {
        const response = await fetch(`/lipa-tourism-dashboard/api/visitor-trends.php?range=${timeRange}`);
        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging line
        chartConfigs.updateVisitorChart(data.labels, data.visitors);
    } catch (error) {
        console.error('Error fetching visitor data:', error);
        const data = sampleData[timeRange];
        console.log('Using Sample Data:', data); // Debugging line
        chartConfigs.updateVisitorChart(data.labels, data.visitors);
    }
}

// Initialize the chart on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchVisitorData(); // Default to 'month'

    // Add event listener for time range selection
    document.getElementById('timeRange').addEventListener('change', (e) => {
        fetchVisitorData(e.target.value);
    });
});