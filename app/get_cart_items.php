<?php
// Include the database connection file
include 'conn.php';

// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Prepare the SQL query to get all cart items
    $sql = "SELECT * FROM cart_items";

    // Execute the query
    $result = $conn->query($sql);

    // Check if there are any results
    if ($result->num_rows > 0) {
        // Fetch all cart items
        $cart_items = array();
        while ($row = $result->fetch_assoc()) {
            $cart_items[] = $row;
        }

        // Return the cart items as JSON
        echo json_encode($cart_items);
    } else {
        // No items found
        echo json_encode(["message" => "No items found in the cart."]);
    }
} else {
    // Invalid request method
    echo json_encode(["message" => "Invalid request method."]);
}

// Close the database connection
$conn->close();
?>
