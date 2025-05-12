<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Database {
    private $host = "localhost";
    private $db_name = "lipa_tourism";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }
        return $this->conn;
    }
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Read landmarks
        $query = "SELECT * FROM landmarks";
        if(isset($_GET['id'])) {
            $query .= " WHERE id = " . $_GET['id'];
        }
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($landmarks);
        break;
        
    case 'POST':
        // Create landmark
        $data = json_decode(file_get_contents("php://input"));
        
        $query = "INSERT INTO landmarks (name, description, location, category) 
                  VALUES (:name, :description, :location, :category)";
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":category", $data->category);
        
        if($stmt->execute()) {
            echo json_encode(["message" => "Landmark created successfully"]);
        } else {
            echo json_encode(["message" => "Unable to create landmark"]);
        }
        break;
        
    case 'PUT':
        // Update landmark
        $data = json_decode(file_get_contents("php://input"));
        
        $query = "UPDATE landmarks 
                  SET name = :name, description = :description, 
                      location = :location, category = :category 
                  WHERE id = :id";
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":category", $data->category);
        
        if($stmt->execute()) {
            echo json_encode(["message" => "Landmark updated successfully"]);
        } else {
            echo json_encode(["message" => "Unable to update landmark"]);
        }
        break;
        
    case 'DELETE':
        // Delete landmark
        $id = $_GET['id'];
        $query = "DELETE FROM landmarks WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);
        
        if($stmt->execute()) {
            echo json_encode(["message" => "Landmark deleted successfully"]);
        } else {
            echo json_encode(["message" => "Unable to delete landmark"]);
        }
        break;
}
?>