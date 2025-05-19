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

    // Get landmark ID from query parameter
    $landmark_id = $_GET['id'] ?? null;

    if (!$landmark_id) {
        handleError('Landmark ID is required', 400);
    }

    // Get landmark details with visit statistics
    $stmt = $pdo->prepare("
        SELECT 
            l.*,
            COUNT(v.id) as total_visits,
            SUM(v.visitor_count) as total_visitors,
            MAX(v.visit_date) as last_visit_date
        FROM landmarks l
        LEFT JOIN visits v ON l.id = v.landmark_id
        WHERE l.id = :landmark_id
        GROUP BY l.id
    ");
    
    $stmt->execute(['landmark_id' => $landmark_id]);
    $landmark = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$landmark) {
        handleError('Landmark not found', 404);
    }

    // Get recent visits for this landmark
    $stmt = $pdo->prepare("
        SELECT 
            visit_date,
            visitor_count
        FROM visits
        WHERE landmark_id = :landmark_id
        ORDER BY visit_date DESC
        LIMIT 10
    ");
    
    $stmt->execute(['landmark_id' => $landmark_id]);
    $recent_visits = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the response
    $response = [
        'landmark' => $landmark,
        'recent_visits' => $recent_visits
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