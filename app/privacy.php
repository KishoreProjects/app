<?php 
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the content type to HTML
header('Content-Type: text/html; charset=UTF-8');

// Output the privacy policy HTML
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .navbar {
            background-color: #333;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .navbar a {
            color: #fff;
            text-decoration: none;
            margin: 0 20px;
        }
        h1, h2, h3, h4 {
            color: #333;
        }
        ul {
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <div class="navbar">
        <h2 style="color: white;">Privacy Policy</h2>
    </div>
    
    <main>
        <section class="privacy-policy">
            <h1>Introduction and Scope</h1>
            <p>Welcome to Mitra-C, a medical application designed for managing patient treatments and interactions, specifically for schizophrenic patients. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.</p>

            <h2>Interpretation and Definitions</h2>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
                <li><strong>Application</strong> refers to Mitra-C, provided by the Company.</li>
                <li><strong>Company</strong> (referred to as "We", "Us" or "Our") refers to the operators of the Mitra-C App.</li>
                <li><strong>Personal Data</strong> refers to information that can identify an individual, such as name, phone number, and health status.</li>
                <li><strong>Service</strong> refers to the Mitra-C App.</li>
                <li><strong>You</strong> refers to the individual or entity using the Service, as applicable.</li>
            </ul>

            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using Our Service, We may ask You to provide Us with personally identifiable information, such as:</p>
            <ul>
                <li>Patient Name</li>
                <li>Age</li>
                <li>Phone number</li>
                <li>Gender</li>
                <li>Address</li>
                <li>Health status</li>
                <li>Marital status</li>
                <li>For caretakers, we collect their relationship with the patient and their designation.</li>
            </ul>

            <h4>Data Sharing</h4>
            <p>The Personal Data collected is shared only between the caretaker and doctor for the purpose of treatment management. The patient will answer questions such as "How do you feel about your medication?" to monitor treatment adherence.</p>

            <h4>Data Retention</h4>
            <p>We will retain Your Personal Data for the duration of the patients treatment. After the treatment ends, typically within a 12-week period, the data will be deleted unless legally required for a longer retention period.</p>

            <h2>User Rights</h2>
            <p>You have the right to request the deletion of Your personal data. Caretakers and doctors can remove patient data upon request, and administrators can remove doctors from the system.</p>

            <h2>Children’s Privacy</h2>
            <p>Our Service is not intended for anyone under the age of 12. We do not knowingly collect personal data from anyone under 12 without parental consent. If you are a parent or guardian and become aware that your child has provided us with personal information, please contact us.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us via email at: neva.niki08@gmail.com</p>
        </section>
    </main>
</body>
</html>';
?>
