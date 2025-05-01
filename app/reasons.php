<?php
require("conn.php"); // Include your database connection file

header('Content-Type: application/json'); // Set response type to JSON

// Check if the form was submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check if required fields are set
    if (isset($_POST['patient_id'], $_POST['patient_name'], $_POST['reason'])) {
        
        // Get values from the POST request
        $patient_id = $_POST['patient_id'];
        $patient_name = $_POST['patient_name'];
        $reason = $_POST['reason'];

        // Prepare the SQL statement to prevent SQL injection
        $sql = "INSERT INTO reasons (patient_id, patient_name, reason) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        
        if ($stmt) {
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "iss", $patient_id, $patient_name, $reason);
            
            // Execute the statement
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Data not inserted. Error: ' . mysqli_error($conn)]);
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
