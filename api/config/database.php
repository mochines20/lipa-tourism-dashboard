<?php
class Database {
    private $host = "localhost";
    private $db_name = "lipa_tourism";
    private $username = "root";
    private $password = "";
    private $conn;
    private $max_retries = 3;
    private $retry_delay = 1; // seconds

    public function getConnection() {
        $this->conn = null;
        $attempts = 0;

        while ($attempts < $this->max_retries) {
            try {
                $this->conn = new PDO(
                    "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                    $this->username,
                    $this->password,
                    array(
                        PDO::ATTR_TIMEOUT => 5, // 5 seconds timeout
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    )
                );
                return $this->conn;
            } catch(PDOException $e) {
                $attempts++;
                $error_code = $e->getCode();
                
                // Handle specific error codes
                switch($error_code) {
                    case 1045: // Access denied
                        throw new Exception("Database access denied. Please check credentials.");
                    case 1049: // Unknown database
                        throw new Exception("Database '{$this->db_name}' does not exist.");
                    case 2002: // Connection refused
                        if ($attempts < $this->max_retries) {
                            sleep($this->retry_delay);
                            continue;
                        }
                        throw new Exception("Could not connect to database server. Please check if MySQL is running.");
                    default:
                        if ($attempts < $this->max_retries) {
                            sleep($this->retry_delay);
                            continue;
                        }
                        throw new Exception("Database connection failed: " . $e->getMessage());
                }
            }
        }
        
        throw new Exception("Failed to connect to database after {$this->max_retries} attempts.");
    }
}