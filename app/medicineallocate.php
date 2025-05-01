<?php
require "conn.php"; // Database connection

header('Content-Type: application/json');

// Query to fetch medicine timings (only current and future records)
$retrieveQuery = "SELECT id, medicine_name, dosage, timing, instructions, date 
                  FROM medicine_timings 
                  WHERE date >= CURDATE() 
                  ORDER BY date ASC";

$result = mysqli_query($conn, $retrieveQuery);

$records = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $records[] = $row;
    }
    echo json_encode(["status" => "success", "records" => $records]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to retrieve records: " . mysqli_error($conn)]);
}

$conn->close();
?>
