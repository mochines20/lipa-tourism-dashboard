<?php
// Start output buffering to catch any unexpected output
ob_start();

// Set error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT");
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
    // Check if database.php exists
    if (!file_exists('config/database.php')) {
        handleError('Database configuration file not found');
    }

    require_once 'config/database.php';

    // Check if Database class exists
    if (!class_exists('Database')) {
        handleError('Database class not found');
    }

    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        handleError('Database connection failed');
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            // Fetch all landmarks
            $query = "SELECT * FROM landmarks ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Ensure image_url has a default value if null
            foreach ($landmarks as &$landmark) {
                if (empty($landmark['image_url'])) {
                    $landmark['image_url'] = 'default.jpg';
                }
            }

            ob_clean(); // Clear any output before sending response
            sendJsonResponse($landmarks);
            break;

        case 'POST':
            // Add a new landmark
            $input = file_get_contents("php://input");
            $data = json_decode($input);
            
            if (!$data) {
                handleError('Invalid JSON data received', 400);
            }

            // Validate required fields
            if (empty($data->name) || empty($data->category)) {
                handleError('Name and category are required fields', 400);
            }

            $query = "INSERT INTO landmarks (name, description, category, image_url) 
                      VALUES (:name, :description, :category, :image_url)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":description", $data->description);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":image_url", $data->image_url);
            
            if($stmt->execute()) {
                ob_clean();
                sendJsonResponse([
                    "success" => true, 
                    "message" => "Landmark added successfully",
                    "id" => $db->lastInsertId()
                ]);
            } else {
                handleError('Failed to add landmark');
            }
            break;

        case 'PUT':
            // Update an existing landmark
            $input = file_get_contents("php://input");
            $data = json_decode($input);
            
            if (!$data) {
                handleError('Invalid JSON data received', 400);
            }

            // Validate required fields
            if (empty($data->id) || empty($data->name) || empty($data->category)) {
                handleError('ID, name, and category are required fields', 400);
            }

            $query = "UPDATE landmarks SET name = :name, category = :category, description = :description WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", $data->id);
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":description", $data->description);
            
            if($stmt->execute()) {
                ob_clean();
                sendJsonResponse([
                    "success" => true,
                    "message" => "Landmark updated successfully"
                ]);
            } else {
                handleError('Failed to update landmark');
            }
            break;

        default:
            handleError('Method not allowed', 405);
            break;
    }
} catch (PDOException $e) {
    handleError('Database error: ' . $e->getMessage());
} catch (Exception $e) {
    handleError($e->getMessage());
} finally {
    // Clean up output buffer
    ob_end_clean();
}
?>