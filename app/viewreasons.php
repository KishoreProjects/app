<?php
require("conn.php"); // Include database connection

$sql = "SELECT id, patient_id, patient_name, reason FROM reasons"; // Removed ORDER BY created_at
$result = mysqli_query($conn, $sql);

$reasons = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $reasons[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $reasons]);
} else {
    echo json_encode(["status" => "error", "message" => "No reasons found."]);
}

mysqli_close($conn);
?>
