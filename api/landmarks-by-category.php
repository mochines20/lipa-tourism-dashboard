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

    $category = $_GET['category'] ?? '';

    if (empty($category)) {
        throw new Exception('Category parameter is required');
    }

    $stmt = $pdo->prepare("
        SELECT * FROM landmarks 
        WHERE category = :category 
        ORDER BY created_at DESC
    ");
    
    $stmt->execute(['category' => $category]);
    $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($landmarks);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 