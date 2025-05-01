<?php
require_once "conn.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['patient_id'], $data['score'], $data['total_questions'])) {
    $patient_id = $data['patient_id'];
    $score = $data['score'];
    $total = $data['total_questions'];

    $query = "INSERT INTO test_scores (patient_id, score, total_questions) VALUES ('$patient_id', '$score', '$total')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true, "message" => "Score saved successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save score"]);
    }
}
?>
