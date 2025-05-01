<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "mitrac");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['status'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    exit;
}

$id = intval($data['id']);
$status = $conn->real_escape_string($data['status']);

// Ensure status is valid
if (!in_array($status, ["approved", "rejected"])) {
    echo json_encode(["status" => "error", "message" => "Invalid status."]);
    exit;
}

// Update appointment table
$sql = "UPDATE appointment SET status='$status' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Appointment updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update appointment."]);
}

$conn->close();
?>
