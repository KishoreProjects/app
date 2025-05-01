<?php
require("conn.php"); // Include database connection

header('Content-Type: application/json'); // Set response type to JSON

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check if required fields are provided
    if (isset($_POST['patient_id'], $_POST['patient_name'], $_POST['report'])) {
        
        // Retrieve values from the POST request
        $patient_id = $_POST['patient_id'];
        $patient_name = $_POST['patient_name'];
        $report = $_POST['report'];

        // Prepare the SQL statement to prevent SQL injection
        $sql = "INSERT INTO reports (patient_id, patient_name, report) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        
        if ($stmt) {
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "iss", $patient_id, $patient_name, $report);
            
            // Execute the statement
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['status' => 'success', 'message' => 'Report submitted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert report. Error: ' . mysqli_error($conn)]);
            }
            
            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . mysqli_error($conn)]);
        }
        
    } else {
        // Missing required fields
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
} else {
    // Request method is not POST
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

// Close the database connection
mysqli_close($conn);
?>
