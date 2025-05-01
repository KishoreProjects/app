<?php
require_once('conn.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Read incoming request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Fallback to form-data if JSON not used
if (!$data) {
    $data = $_POST;
}

// Extract and validate data
$caretaker_id = $data["caretaker_id"] ?? null;
$name = $data["name"] ?? null;
$age = isset($data["age"]) ? (int)$data["age"] : null;
$sex = $data["sex"] ?? null;
$relation = $data["relation"] ?? null;
$mobilenp = $data["mobilenp"] ?? null;
$about = $data["about"] ?? null;

// Validate required fields
if (!$caretaker_id || !$name || !$age || !$sex || !$relation || !$mobilenp) {
    echo json_encode(["status" => "error", "message" => "All required fields must be filled"]);
    exit;
}

// Validate age is positive number
if ($age <= 0) {
    echo json_encode(["status" => "error", "message" => "Age must be a positive number"]);
    exit;
}

// Check if caretaker exists
$check_sql = "SELECT caretaker_id FROM caretaker_profile WHERE caretaker_id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("s", $caretaker_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Caretaker ID already exists"]);
    exit;
}

// Insert new caretaker
$insert_sql = "INSERT INTO caretaker_profile 
              (caretaker_id, name, age, sex, relation, mobilenp, about) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($insert_sql);
$stmt->bind_param("ssissss", 
    $caretaker_id,
    $name,
    $age,
    $sex,
    $relation,
    $mobilenp,
    $about
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Caretaker added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>