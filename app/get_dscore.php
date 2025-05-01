<?php
include 'conn.php'; // Database connection file

header('Content-Type: application/json');

$response = array();

// Fetch daily scores from the d_score table
$sql = "SELECT patient_id, score, total, date_taken FROM test_scores ORDER BY date_taken DESC";
$result = mysqli_query($conn, $sql);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
        }
    } else {
        $response = array("success" => false, "message" => "No daily scores found.");
    }
} else {
    $response = array("success" => false, "message" => "Query failed: " . mysqli_error($conn));
}

// Return JSON response
echo json_encode($response);
mysqli_close($conn);
?>
