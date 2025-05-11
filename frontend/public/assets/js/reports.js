import chartConfigs from './charts.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();

    // Add download report handler
    const downloadBtn = document.querySelector('#downloadReport');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadReport);
    }

    // Add period selector handler
    const periodSelector = document.querySelector('#reportPeriod');
    if (periodSelector) {
        periodSelector.addEventListener('change', updateReportPeriod);
    }
});

function initializeCharts() {
    // Initialize yearly chart
    const yearlyChartCtx = document.getElementById('yearlyChart');
    if (yearlyChartCtx) {
        chartConfigs.createAnnualReportChart(yearlyChartCtx.getContext('2d'), {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            visitors: [15000, 18000, 22000, 25000, 30000]
        });
    }
}

function downloadReport() {
    // Implement report download logic
    console.log('Downloading report...');
}

function updateReportPeriod(e) {
    // Implement period update logic
    console.log('Updating report period:', e.target.value);
}