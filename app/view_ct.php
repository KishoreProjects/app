<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('conn.php');

$result = $conn->query("SELECT * FROM caretaker_profile");
$caretakers = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $caretakers[] = $row;
    }
}

// Ensure caretakers is always an array
echo json_encode([
    "status" => "success",
    "caretakers" => $caretakers ?: [] // Fallback to empty array
]);

$conn->close();
?>