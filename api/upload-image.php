<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$target_dir = "../frontend/public/assets/images/landmarks/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if(isset($_FILES["image"])) {
    $file = $_FILES["image"];
    $fileName = time() . '_' . basename($file["name"]);
    $target_file = $target_dir . $fileName;
    
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        echo json_encode([
            "success" => true,
            "message" => "Image uploaded successfully",
            "filename" => $fileName
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error uploading image"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "No image file received"
    ]);
}
?>
