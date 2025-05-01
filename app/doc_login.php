<?php
// Enable error reporting for debugging (Remove in production)
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

// Database connection
$host = "localhost";  // Change this if needed
$dbname = "mitrac";   // Your database name
$username_db = "root";  // Change if different
$password_db = "";  // Change if different

$conn = new mysqli($host, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "failure", "message" => "Database connection failed"]);
    exit;
}

// Read the request body
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data["username"]) || !isset($data["password"])) {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "failure", "message" => "Missing username or password"]);
    exit;
}

// Extract username and password
$username = trim($data["username"]);
$password = trim($data["password"]);

// Query to check credentials for doctor login
$stmt = $conn->prepare("SELECT * FROM doc_login WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(200); // OK
    echo json_encode(["status" => "success", "message" => "Login successful"]);
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(["status" => "failure", "message" => "Invalid username or password"]);
}

// Close connection
$stmt->close();
$conn->close();
?>
