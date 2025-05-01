<?php
// Include database connection
include 'conn.php';

// Initialize response array
$response = array();

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON input
    $input_data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (isset($input_data['patient_id']) && isset($input_data['score']) && isset($input_data['total'])) {
        $patient_id = $input_data['patient_id'];
        $score = $input_data['score'];
        $total = $input_data['total'];
        $today_date = date('Y-m-d');

        // Insert or update the weekly score
        $insert_sql = "INSERT INTO w_score (patient_id, score, total, date) 
                       VALUES ('$patient_id', '$score', '$total', '$today_date')
                       ON DUPLICATE KEY UPDATE score='$score', total='$total', date='$today_date'";

        if (mysqli_query($conn, $insert_sql)) {
            // Success response
            $response['success'] = true;
            $response['message'] = "Weekly score recorded successfully";
        } else {
            // Error response
            $response['success'] = false;
            $response['message'] = "Error storing score: " . mysqli_error($conn);
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Missing required parameters";
    }

    // Close database connection
    mysqli_close($conn);
} else {
    // If request is not POST
    $response['success'] = false;
    $response['message'] = "Invalid request method";
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
