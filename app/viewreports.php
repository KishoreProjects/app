<?php
require("conn.php"); // Include database connection

// Query to fetch reports from the database
$sql = "SELECT id, patient_id, patient_name, report , created_at FROM reports"; 
$result = mysqli_query($conn, $sql);

$reports = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $reports[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $reports]);
} else {
    echo json_encode(["status" => "error", "message" => "No reports found."]);
}

// Close the database connection
mysqli_close($conn);
?>
