<?php
require("conn.php");

header("Content-Type: application/json");

// Check request method
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["status" => "failure", "message" => "Invalid request method"]);
    exit;
}

// Read the JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Debug: Check received data
if (!$data) {
    echo json_encode(["status" => "failure", "message" => "Invalid JSON or empty request", "received_data" => $json]);
    exit;
}

// Debug: Log received JSON keys
$expected_keys = ["patientId", "name", "phone", "date", "time", "address"];
$missing_keys = [];
foreach ($expected_keys as $key) {
    if (!isset($data[$key])) {
        $missing_keys[] = $key;
    }
}

if (!empty($missing_keys)) {
    echo json_encode(["status" => "failure", "message" => "Missing required fields", "missing_keys" => $missing_keys, "received_data" => $data]);
    exit;
}

// Sanitize inputs
$pid = mysqli_real_escape_string($conn, $data["patientId"]); // Ensure correct key name
$name = mysqli_real_escape_string($conn, $data["name"]);
$phone = mysqli_real_escape_string($conn, $data["phone"]);
$date = mysqli_real_escape_string($conn, $data["date"]);
$time = mysqli_real_escape_string($conn, $data["time"]);
$address = mysqli_real_escape_string($conn, $data["address"]);
$status = "pending";

// Check if an appointment already exists for this patient on the given date
$check_query = "SELECT * FROM appointment WHERE patient_id = ? AND date = ?";
$stmt = mysqli_prepare($conn, $check_query);
mysqli_stmt_bind_param($stmt, "ss", $pid, $date);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["status" => "failure", "message" => "Appointment already exists for this date"]);
    exit;
}

// Insert new appointment
$sql = "INSERT INTO appointment (patient_id, name, phone, date, time, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "sssssss", $pid, $name, $phone, $date, $time, $address, $status);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success", "message" => "Appointment booked successfully"]);
} else {
    echo json_encode(["status" => "failure", "message" => "Error inserting appointment"]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
