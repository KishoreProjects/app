<?php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("localhost", "root", "", "mitrac");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Allow both GET and POST methods
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM patients_recently_added"; // Change table name if needed
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $patients = [];
        while ($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
        echo json_encode(["status" => "success", "patients" => $patients]);
    } else {
        echo json_encode(["status" => "error", "message" => "No patients found"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
