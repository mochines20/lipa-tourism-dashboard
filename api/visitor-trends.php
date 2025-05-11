<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Sample data - replace with database queries in production
$data = [
    'week' => [
        'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        'visitors' => [150, 230, 180, 340, 420, 560, 390]
    ],
    'month' => [
        'labels' => ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        'visitors' => [1200, 1900, 1700, 2100]
    ],
    'year' => [
        'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'visitors' => [1500, 1700, 1900, 2100, 2300, 2500, 2700, 2900, 3100, 3300, 3500, 3700]
    ]
];

$range = $_GET['range'] ?? 'month';
echo json_encode($data[$range] ?? $data['month']);
?>