<?php
// Include the database connection file
include 'conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $jsonData = file_get_contents('php://input');

    // Decode the JSON data
    $data = json_decode($jsonData, true);

    // Check if the required fields exist
    if (isset($data['product_name']) && isset($data['price']) && isset($data['quantity'])) {
        // Extract the values from the decoded JSON data
        $product_name = $data['product_name'];
        $price = $data['price'];
        $quantity = $data['quantity'];
        $total_price = $price * $quantity;

        // Insert into the cart_items table
        $sql = "INSERT INTO cart_items (product_name, price, quantity, total_price)
                VALUES ('$product_name', '$price', '$quantity', '$total_price')";

        if ($conn->query($sql) === TRUE) {
            echo "Item added to cart successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Missing required fields: product_name, price, or quantity.";
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
