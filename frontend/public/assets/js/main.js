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

let visitorChart = null; // Make chart instance global
let barChart, pieChart, radarChart; // Chart instances

// Example datasets for each time range
const chartDataSets = {
    daily: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [200, 350, 400, 300, 500, 600, 700]
    },
    weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [1200, 1800, 1600, 2100]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [4000, 4200, 3900, 4500, 4700, 5000]
    },
    yearly: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [25000, 27000, 30000, 32000, 35000]
    }
};

// Fetch visitor data and update the chart
async function fetchVisitorData(period = 'monthly') {
    try {
        // Use a relative path to the API from assets/js/
        const apiUrl = '/lipa-tourism-dashboard/api/visits.php?period=' + period;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        let labels = [];
        let visitors = [];
        if (
            data &&
            Array.isArray(data.labels) &&
            Array.isArray(data.visitors) &&
            data.labels.length > 0 &&
            data.visitors.length > 0
        ) {
            labels = data.labels;
            visitors = data.visitors;
        } else if (chartDataSets[period]) {
            labels = chartDataSets[period].labels;
            visitors = chartDataSets[period].data;
        }

        // Always update chart with the latest data and reset arrays
        if (visitorChart) {
            visitorChart.data.labels.length = 0;
            visitorChart.data.datasets[0].data.length = 0;
            Array.prototype.push.apply(visitorChart.data.labels, labels);
            Array.prototype.push.apply(visitorChart.data.datasets[0].data, visitors);
            visitorChart.update();
        }
    } catch (error) {
        // On error, fallback to static data
        if (visitorChart && chartDataSets[period]) {
            visitorChart.data.labels.length = 0;
            visitorChart.data.datasets[0].data.length = 0;
            Array.prototype.push.apply(visitorChart.data.labels, chartDataSets[period].labels);
            Array.prototype.push.apply(visitorChart.data.datasets[0].data, chartDataSets[period].data);
            visitorChart.update();
        }
        console.error('Error updating chart:', error);
    }
}

// Fetch landmarks data and display it
async function fetchLandmarks() {
    try {
        const basePath = window.location.pathname.split('/frontend/')[0] || '';
        const response = await fetch(`${basePath}/api/landmarks.php`);
        const landmarks = await response.json();
        displayLandmarks(landmarks);
    } catch (error) {
        console.error('Error fetching landmarks:', error);
    }
}

// Add a new landmark
async function addLandmark(landmarkData) {
    try {
        const basePath = window.location.pathname.split('/frontend/')[0] || '';
        const response = await fetch(`${basePath}/api/landmarks.php`, {
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
        const basePath = window.location.pathname.split('/frontend/')[0] || '';
        const response = await fetch(`${basePath}/api/landmarks.php`, {
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
    initializeBarChart();
    initializePieChart();
    initializeRadarChart();
});

function initializeVisitorChart() {
    const ctx = document.getElementById('visitorChart');
    if (!ctx) {
        return;
    }

    // Get initial period from dropdown value
    const timeRange = document.getElementById('timeRange');
    const initialPeriod = timeRange ? timeRange.value : 'monthly';

    visitorChart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: chartDataSets[initialPeriod].labels,
            datasets: [{
                label: 'Visitors',
                data: chartDataSets[initialPeriod].data,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Visitor Trends' }
            },
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Visitors' }, beginAtZero: true }
            }
        }
    });

    // Fetch initial data for default period
    fetchVisitorData(initialPeriod);

    // Add event listener for time range selector
    if (timeRange) {
        timeRange.addEventListener('change', function () {
            const range = this.value;
            fetchVisitorData(range);
        });
    }
}

function initializeBarChart() {
    const ctx = document.getElementById('barChart');
    if (!ctx) {
        console.log('Bar chart canvas not found');
        return;
    }
    barChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['San Sebastian Cathedral', 'Casa de Segunda', 'Mount Malarayat', 'The Farm'],
            datasets: [{
                label: 'Visits',
                data: [1200, 900, 700, 500],
                backgroundColor: [
                    'rgba(59,130,246,0.7)',
                    'rgba(16,185,129,0.7)',
                    'rgba(245,158,11,0.7)',
                    'rgba(139,92,246,0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Visits per Landmark' }
            },
            scales: {
                x: { title: { display: true, text: 'Landmark' } },
                y: { title: { display: true, text: 'Visits' }, beginAtZero: true }
            }
        }
    });
    console.log('Bar chart initialized');
}

function initializePieChart() {
    const ctx = document.getElementById('pieChart');
    if (!ctx) {
        console.log('Pie chart canvas not found');
        return;
    }
    pieChart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Local', 'Foreign'],
            datasets: [{
                label: 'Visitor Type',
                data: [3200, 800],
                backgroundColor: [
                    'rgba(59,130,246,0.7)',
                    'rgba(245,158,11,0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Visitor Breakdown' }
            }
        }
    });
    console.log('Pie chart initialized');
}

function initializeRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) {
        console.log('Radar chart canvas not found');
        return;
    }
    radarChart = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Nature', 'Culture', 'Recreation', 'History', 'Wellness'],
            datasets: [{
                label: 'Interest Level',
                data: [80, 90, 70, 60, 75],
                backgroundColor: 'rgba(59,130,246,0.2)',
                borderColor: 'rgba(59,130,246,1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                title: { display: true, text: 'Visitor Profile' }
            }
        }
    });
    console.log('Radar chart initialized');
}

// Handle image error to set default image
function handleImageError(img) {
    img.onerror = null;  // Prevent infinite loop
    img.src = 'assets/images/landmarks/default.jpg';
}

// Update the landmark cards HTML generation
function createLandmarkCard(landmark) {
    return `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition landmark-card" data-category="${landmark.category}">
            <img src="assets/images/landmarks/${landmark.image_url}" 
                 alt="${landmark.name}" 
                 class="w-full h-48 object-cover"
                 onerror="handleImageError(this)">
            <div class="p-6">
                <h2 class="text-xl font-semibold mb-2">${landmark.name}</h2>
                <p class="text-gray-700 mb-4">${landmark.description}</p>
                <a href="landmark.html?id=${landmark.id}" class="text-blue-600 hover:underline">View Details</a>
            </div>
        </div>
    `;
}