<?php
require_once "conn.php";  // Ensure the database connection works
header("Content-Type: application/json");

// Ensure request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get raw JSON input
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Validate received data
    if (isset($data["patient_id"]) && isset($data["score"]) && isset($data["total"])) {
        $patient_id = intval($data["patient_id"]);
        $score = intval($data["score"]);
        $total = intval($data["total"]);
        $date_taken = date("Y-m-d");

        // Insert score into database
        $query = "INSERT INTO test_scores (patient_id, score, total, date_taken) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iiis", $patient_id, $score, $total, $date_taken);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["success" => true, "message" => "Score submitted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Database insert failed"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid request data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
