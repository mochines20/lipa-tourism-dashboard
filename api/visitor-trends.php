<?php
// Start output buffering to catch any unexpected output
ob_start();

// Set error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Function to send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Function to handle errors
function handleError($message, $statusCode = 500) {
    ob_clean(); // Clear any output
    sendJsonResponse(['error' => $message], $statusCode);
}

try {
    // Database connection
    $host = 'localhost';
    $dbname = 'lipa_tourism';
    $username = 'root';
    $password = '';

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get visitor trends for the last 30 days
    $stmt = $pdo->prepare("
        SELECT 
            DATE(visit_date) as date,
            COUNT(*) as visit_count,
            SUM(visitor_count) as total_visitors
        FROM visits
        WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(visit_date)
        ORDER BY date DESC
    ");
    
    $stmt->execute();
    $trends = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the response
    $response = [
        'labels' => array_column($trends, 'date'),
        'visits' => array_column($trends, 'visit_count'),
        'visitors' => array_column($trends, 'total_visitors')
    ];

    ob_clean(); // Clear any output before sending response
    sendJsonResponse($response);

} catch(PDOException $e) {
    handleError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    handleError($e->getMessage());
} finally {
    // Clean up output buffer
    ob_end_clean();
}
?>