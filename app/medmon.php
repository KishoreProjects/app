<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// Read input JSON
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

// Log received data for debugging
file_put_contents("log.txt", date('Y-m-d H:i:s') . " - Received Data: " . json_encode($data) . "\n", FILE_APPEND);

// Required fields
$required_fields = ['medicine_name', 'dosage', 'timing'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        $missing_fields[] = $field;
    }
}

// If required fields are missing, return an error
if (!empty($missing_fields)) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields: " . implode(", ", $missing_fields),
        "received_data" => $data
    ]);
    exit;
}

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mitrac";

// Establish database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO medicine_timings (medicine_name, dosage, timing, instructions, date) VALUES (?, ?, ?, ?, CURDATE())");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
    exit;
}

// Bind parameters (Ensure instructions is not NULL)
$medicine_name = htmlspecialchars(trim($data['medicine_name']));
$dosage = htmlspecialchars(trim($data['dosage']));
$timing = htmlspecialchars(trim($data['timing']));
$instructions = isset($data['instructions']) ? htmlspecialchars(trim($data['instructions'])) : "";

// Bind and execute statement
$stmt->bind_param("ssss", $medicine_name, $dosage, $timing, $instructions);

try {
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Medicine added successfully"]);
    } else {
        throw new Exception("Database execution error: " . $stmt->error);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

// Close connection
$stmt->close();
$conn->close();
?>
