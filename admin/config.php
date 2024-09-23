<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "database";


$con = mysqli_connect($host, $username, $password, $database);

if (mysqli_connect_errno()) {
    $error_message = "Failed to connect to MySQL: " . mysqli_connect_error();
    error_log($error_message);
    die(json_encode(array("status" => "error", "message" => "Database connection failed")));
}

// Set charset to ensure proper encoding
// mysqli_set_charset($con, "utf8mb4");

// Note: logError function is now defined in api_auth.php
?>
