<?php
require_once('conn.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$sql = "SELECT * FROM doctor_profile";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $doctors = [];
    while ($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
    echo json_encode(["status" => "success", "doctors" => $doctors]);
} else {
    echo json_encode(["status" => "error", "message" => "No doctors found"]);
}

$conn->close();
?>
