<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$dbname = 'lipa_tourism';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("
        SELECT 
            l.*,
            COUNT(v.id) as total_visits,
            SUM(v.visitor_count) as total_visitors
        FROM landmarks l
        LEFT JOIN visits v ON l.id = v.landmark_id
        GROUP BY l.id
        ORDER BY total_visitors DESC
    ");
    
    $stats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($stats);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?> 