<?php
include 'conn.php'; // Include your database connection file

header('Content-Type: application/json');

$response = array();

$sql = "SELECT patient_id, score, total, date FROM w_score ORDER BY date DESC";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $response[] = $row;
    }
} else {
    $response = array("success" => false, "message" => "No weekly scores found.");
}

echo json_encode($response);
mysqli_close($conn);
?>
