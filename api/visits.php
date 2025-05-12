<?php
// filepath: c:\xampp\htdocs\lipa-tourism-dashboard\api\visits.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST");
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
            // Get visitor statistics
            $period = $_GET['period'] ?? 'monthly';
            $query = "";

            switch($period) {
                case 'daily':
                    $query = "SELECT DATE(visit_date) as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             WHERE visit_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
                             GROUP BY DATE(visit_date)
                             ORDER BY visit_date";
                    break;
                    
                case 'weekly':
                    $query = "SELECT CONCAT('Week ', WEEK(visit_date)) as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             WHERE visit_date >= DATE_SUB(CURRENT_DATE, INTERVAL 4 WEEK)
                             GROUP BY WEEK(visit_date)
                             ORDER BY WEEK(visit_date)";
                    break;
                    
                case 'monthly':
                    $query = "SELECT DATE_FORMAT(visit_date, '%b') as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             WHERE visit_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
                             GROUP BY MONTH(visit_date)
                             ORDER BY visit_date";
                    break;
                    
                case 'yearly':
                    $query = "SELECT YEAR(visit_date) as label, SUM(visitor_count) as visitors 
                             FROM visits 
                             GROUP BY YEAR(visit_date)
                             ORDER BY visit_date";
                    break;
            }
            
            $stmt = $db->prepare($query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $response = [
                'labels' => array_column($results, 'label'),
                'visitors' => array_column($results, 'visitors')
            ];
            
            echo json_encode($response);
            break;
            
        case 'POST':
            // Record new visit
            $data = json_decode(file_get_contents("php://input"));
            
            $query = "INSERT INTO visits (landmark_id, visit_date, visitor_count) 
                      VALUES (:landmark_id, :visit_date, :visitor_count)";
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":landmark_id", $data->landmark_id);
            $stmt->bindParam(":visit_date", $data->visit_date);
            $stmt->bindParam(":visitor_count", $data->visitor_count);
            
            if($stmt->execute()) {
                echo json_encode(["message" => "Visit recorded successfully"]);
            } else {
                echo json_encode(["message" => "Unable to record visit"]);
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>