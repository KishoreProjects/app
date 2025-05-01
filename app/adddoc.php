<?php
require_once('conn.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Read incoming request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if data is received
if (!$data) {
    $data = $_POST; // Fallback to form-data if JSON is not used
}

// Validate received data
$doctorId = isset($data["doctorId"]) ? $data["doctorId"] : null;
$name = isset($data["name"]) ? $data["name"] : null;
$mobileNo = isset($data["mobileNo"]) ? $data["mobileNo"] : null;
$specialization = isset($data["specialization"]) ? $data["specialization"] : null;
$sex = isset($data["sex"]) ? $data["sex"] : null;
$address = isset($data["address"]) ? $data["address"] : null;
$maritalStatus = isset($data["maritalStatus"]) ? $data["maritalStatus"] : null;
$about = isset($data["about"]) ? $data["about"] : null;

// Check for required fields
if (!$doctorId || !$name || !$mobileNo || !$specialization || !$sex || !$address || !$maritalStatus) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Check if doctor already exists
$check_sql = "SELECT doctorId FROM doctor_profile WHERE doctorId = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("s", $doctorId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Doctor already exists"]);
    exit;
}

// Insert into database
$insert_sql = "INSERT INTO doctor_profile (doctorId, name, mobileNo, specialization, sex, address, maritalStatus, about) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insert_sql);
$stmt->bind_param("ssssssss", $doctorId, $name, $mobileNo, $specialization, $sex, $address, $maritalStatus, $about);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Doctor added successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
