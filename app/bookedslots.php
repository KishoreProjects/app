<?php
require("conn.php");

header("Content-Type: application/json");

$sql = "SELECT * FROM appointment";  
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(["status" => "error", "message" => "Database query failed: " . mysqli_error($conn)]);
    exit;
}

$appointments = [];

while ($row = mysqli_fetch_assoc($result)) {
    $appointments[] = $row;
}

// Debugging - Check if appointments were fetched
if (empty($appointments)) {
    echo json_encode(["status" => "success", "data" => [], "message" => "No appointments available"]);
} else {
    echo json_encode(["status" => "success", "data" => $appointments]);
}

mysqli_close($conn);
?>
