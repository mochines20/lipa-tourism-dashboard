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

    $start_date = $_GET['start_date'] ?? date('Y-m-d', strtotime('-30 days'));
    $end_date = $_GET['end_date'] ?? date('Y-m-d');

    $stmt = $pdo->prepare("
        SELECT 
            v.*,
            l.name as landmark_name,
            l.category as landmark_category
        FROM visits v
        JOIN landmarks l ON v.landmark_id = l.id
        WHERE v.visit_date BETWEEN :start_date AND :end_date
        ORDER BY v.visit_date DESC
    ");
    
    $stmt->execute([
        'start_date' => $start_date,
        'end_date' => $end_date
    ]);
    
    $visits = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($visits);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?> 