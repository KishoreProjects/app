<?php
// Include database connection
include("conn.php");

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Ensure request method is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "failure", "message" => "Invalid request method. Use POST."]);
    exit;
}

// Read and decode the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$requiredFields = ["patient_id", "name", "age", "gender", "phone", "address", "disease"];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        http_response_code(400); // Bad Request
        echo json_encode(["status" => "failure", "message" => "Missing required field: $field"]);
        exit;
    }
}

// Extract data from the request
$patient_id = trim($data["patient_id"]);
$name = trim($data["name"]);
$age = intval($data["age"]); // Convert to integer
$gender = trim($data["gender"]);
$phone = trim($data["phone"]);
$address = trim($data["address"]);
$disease = trim($data["disease"]);

// Prepare SQL query to insert data
$stmt = $conn->prepare("INSERT INTO patients_recently_added (patient_id, name, age, gender, phone, address, disease) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssissss", $patient_id, $name, $age, $gender, $phone, $address, $disease);

// Execute the query
if ($stmt->execute()) {
    http_response_code(201); // Created
    echo json_encode(["status" => "success", "message" => "Patient added successfully"]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["status" => "failure", "message" => "Database insertion error: " . $stmt->error]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
