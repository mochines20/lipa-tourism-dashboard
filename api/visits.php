<?php
// Start output buffering to catch any unexpected output
ob_start();

// Set error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            // Get visitor statistics
            $period = $_GET['period'] ?? 'monthly';
            $query = "";

            switch($period) {
                case 'daily':
                    $query = "SELECT DATE(visit_date) as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             GROUP BY DATE(visit_date)
                             ORDER BY DATE(visit_date)";
                    break;
                    
                case 'weekly':
                    $query = "SELECT CONCAT(YEAR(visit_date), '-W', LPAD(WEEK(visit_date, 1),2,'0')) as label, 
                             SUM(visitor_count) as visitors 
                             FROM visits 
                             GROUP BY YEAR(visit_date), WEEK(visit_date, 1)
                             ORDER BY YEAR(visit_date), WEEK(visit_date, 1)";
                    break;
                    
                case 'monthly':
                    $query = "SELECT CONCAT(YEAR(visit_date), '-', LPAD(MONTH(visit_date),2,'0')) as label, 
                             SUM(visitor_count) as visitors 
                             FROM visits 
                             GROUP BY YEAR(visit_date), MONTH(visit_date)
                             ORDER BY YEAR(visit_date), MONTH(visit_date)";
                    break;
                    
                case 'yearly':
                    $query = "SELECT YEAR(visit_date) as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             GROUP BY YEAR(visit_date)
                             ORDER BY YEAR(visit_date)";
                    break;
                    
                default:
                    handleError('Invalid period specified', 400);
            }
            
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $response = [
                'labels' => array_column($results, 'label'),
                'visitors' => array_column($results, 'visitors')
            ];
            
            ob_clean();
            sendJsonResponse($response);
            break;
            
        case 'POST':
            // Record new visit
            $input = file_get_contents("php://input");
            $data = json_decode($input);
            
            if (!$data) {
                handleError('Invalid JSON data received', 400);
            }

            // Validate required fields
            if (empty($data->landmark_id) || empty($data->visit_date) || empty($data->visitor_count)) {
                handleError('Landmark ID, visit date, and visitor count are required', 400);
            }

            $query = "INSERT INTO visits (landmark_id, visit_date, visitor_count) 
                      VALUES (:landmark_id, :visit_date, :visitor_count)";
            $stmt = $pdo->prepare($query);
            
            $stmt->bindParam(":landmark_id", $data->landmark_id);
            $stmt->bindParam(":visit_date", $data->visit_date);
            $stmt->bindParam(":visitor_count", $data->visitor_count);
            
            if($stmt->execute()) {
                ob_clean();
                sendJsonResponse([
                    "success" => true,
                    "message" => "Visit recorded successfully",
                    "id" => $pdo->lastInsertId()
                ]);
            } else {
                handleError('Failed to record visit');
            }
            break;

        default:
            handleError('Method not allowed', 405);
            break;
    }
} catch(PDOException $e) {
    handleError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    handleError($e->getMessage());
} finally {
    // Clean up output buffer
    ob_end_clean();
}
?>