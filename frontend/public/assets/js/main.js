// Chart configurations
const chartConfigs = {
    baseConfig: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Fetch visitor data and update the chart
async function fetchVisitorData(period = 'monthly') {
    try {
        const response = await fetch(`/api/visits.php?period=${period}`);
        const data = await response.json();
        
        // Process the data for the chart
        const labels = data.map(item => item.date || item.week || item.month || item.year);
        const visitors = data.map(item => item.count);
        
        // Update the chart
        updateChart(labels, visitors);
    } catch (error) {
        console.error('Error fetching visitor data:', error);
    }
}

// Fetch landmarks data and display it
async function fetchLandmarks() {
    try {
        const response = await fetch('/api/landmarks.php');
        const landmarks = await response.json();
        displayLandmarks(landmarks);
    } catch (error) {
        console.error('Error fetching landmarks:', error);
    }
}

// Add a new landmark
async function addLandmark(landmarkData) {
    try {
        const response = await fetch('/api/landmarks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(landmarkData)
        });
        const result = await response.json();
        console.log(result.message);
        // Refresh landmarks list
        fetchLandmarks();
    } catch (error) {
        console.error('Error adding landmark:', error);
    }
}

// Update an existing landmark
async function updateLandmark(id, landmarkData) {
    try {
        const response = await fetch('/api/landmarks.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, ...landmarkData })
        });
        const result = await response.json();
        console.log(result.message);
        // Refresh landmarks list
        fetchLandmarks();
    } catch (error) {
        console.error('Error updating landmark:', error);
    }
}

// Initialize charts and data on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeVisitorChart();
});

function initializeVisitorChart() {
    const ctx = document.getElementById('visitorChart');
    if (!ctx) return;

    const visitorChart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Visitors',
                data: [1200, 1900, 1700, 2100],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: chartConfigs.baseConfig
    });

    // Add event listener for time range selector
    const timeRange = document.getElementById('timeRange');
    if (timeRange) {
        timeRange.addEventListener('change', async (e) => {
            const period = e.target.value;
            try {
                const response = await fetch(`/api/visits.php?period=${period}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                
                // Update chart with new data
                visitorChart.data.labels = data.labels;
                visitorChart.data.datasets[0].data = data.visitors;
                visitorChart.update();
            } catch (error) {
                console.error('Error updating chart:', error);
            }
        });
    }
}