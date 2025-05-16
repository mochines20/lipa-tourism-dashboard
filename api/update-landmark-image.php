<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE landmarks SET image_url = :image_url WHERE id = :id";
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":image_url", $data->image_url);
    $stmt->bindParam(":id", $data->id);
    
    if($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Image URL updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update image URL"
        ]);
    }
} catch(Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
