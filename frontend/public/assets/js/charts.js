// Sample data for chart initialization
const sampleData = {
    week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        visitors: [150, 230, 180, 340, 420, 560, 390]
    },
    month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        visitors: [1200, 1900, 1700, 2100]
    },
    year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        visitors: [1500, 1700, 1900, 2100, 2300, 2500, 2700, 2900, 3100, 3300, 3500, 3700]
    }
};

// Chart configurations and utilities
const chartConfigs = {
    // Base configuration for visitor charts
    baseConfig: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                grid: { display: false }
            }
        }
    },

    updateVisitorChart(labels, visitors) {
        console.log('Labels:', labels); // Debugging line
        console.log('Visitors:', visitors); // Debugging line

        const ctx = document.getElementById('visitorChart').getContext('2d');
        
        if (window.visitorChart instanceof Chart) {
            window.visitorChart.destroy();
        }

        window.visitorChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Visitors',
                    data: visitors,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgba(59, 130, 246, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: this.baseConfig
        });
    },
    

    createAnnualReportChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Annual Visitors',
                    data: data.visitors,
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: this.baseConfig
        });
    }
};

export { chartConfigs, sampleData };