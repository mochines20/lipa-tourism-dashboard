<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Configuration
$target_dir = "../frontend/public/assets/images/landmarks/";
$max_file_size = 5 * 1024 * 1024; // 5MB
$allowed_types = ['image/jpeg', 'image/png', 'image/gif'];

// Create directory if it doesn't exist
if (!file_exists($target_dir)) {
    if (!mkdir($target_dir, 0777, true)) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Failed to create upload directory"
        ]);
        exit;
    }
}

// Check if file was uploaded
if (!isset($_FILES["image"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No image file received"
    ]);
    exit;
}

$file = $_FILES["image"];

// Check for upload errors
if ($file["error"] !== UPLOAD_ERR_OK) {
    $error_message = match($file["error"]) {
        UPLOAD_ERR_INI_SIZE => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
        UPLOAD_ERR_FORM_SIZE => "The uploaded file exceeds the MAX_FILE_SIZE directive in the HTML form",
        UPLOAD_ERR_PARTIAL => "The uploaded file was only partially uploaded",
        UPLOAD_ERR_NO_FILE => "No file was uploaded",
        UPLOAD_ERR_NO_TMP_DIR => "Missing a temporary folder",
        UPLOAD_ERR_CANT_WRITE => "Failed to write file to disk",
        UPLOAD_ERR_EXTENSION => "A PHP extension stopped the file upload",
        default => "Unknown upload error"
    };
    
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $error_message
    ]);
    exit;
}

// Validate file size
if ($file["size"] > $max_file_size) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "File size exceeds the maximum limit of 5MB"
    ]);
    exit;
}

// Validate file type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file["tmp_name"]);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid file type. Only JPG, PNG, and GIF files are allowed"
    ]);
    exit;
}

// Generate unique filename
$file_extension = pathinfo($file["name"], PATHINFO_EXTENSION);
$fileName = time() . '_' . uniqid() . '.' . $file_extension;
$target_file = $target_dir . $fileName;

// Move uploaded file
if (move_uploaded_file($file["tmp_name"], $target_file)) {
    echo json_encode([
        "success" => true,
        "message" => "Image uploaded successfully",
        "filename" => $fileName
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to move uploaded file. Please check directory permissions."
    ]);
}
?>
