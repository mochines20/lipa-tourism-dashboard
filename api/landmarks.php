<?php
// filepath: c:\xampp\htdocs\lipa-tourism-dashboard\api\landmarks.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Check if database.php exists
if (!file_exists('config/database.php')) {
    die(json_encode(['error' => 'Database configuration file not found']));
}

require_once 'config/database.php';

// Check if Database class exists
if (!class_exists('Database')) {
    die(json_encode(['error' => 'Database class not found']));
}

try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception("Database connection failed");
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            // Fetch all landmarks
            $query = "SELECT * FROM landmarks ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($landmarks);
            break;

        case 'POST':
            // Add a new landmark
            $data = json_decode(file_get_contents("php://input"));
            
            $query = "INSERT INTO landmarks (name, description, category, image_url) 
                      VALUES (:name, :description, :category, :image_url)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":description", $data->description);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":image_url", $data->image_url);
            
            if($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Landmark added successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to add landmark"]);
            }
            break;

        case 'PUT':
            // Update an existing landmark
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE landmarks SET name = :name, category = :category, description = :description WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", $data->id);
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":description", $data->description);
            if($stmt->execute()) {
                echo json_encode(["message" => "Landmark updated successfully"]);
            } else {
                echo json_encode(["message" => "Unable to update landmark"]);
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>