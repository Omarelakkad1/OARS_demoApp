<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow all origins during development
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require("config.php");

function generateToken($userId) {
    return bin2hex(random_bytes(16)) . '_' . $userId;
}

// Error logging function
function logError($message) {
    error_log(date('[Y-m-d H:i:s] ') . $message . "\n", 3, 'api_errors.log');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = isset($data['action']) ? $data['action'] : '';

    if ($action === 'login') {
        $email = mysqli_real_escape_string($con, $data['email']);
        $password = $data['password'];

        $query = mysqli_query($con, "SELECT * FROM student WHERE Email = '$email'");
        if ($student = mysqli_fetch_assoc($query)) {
            // Note: We're not checking the password here as the current schema doesn't have a password field
            // You may want to add a password field to the student table for proper authentication
            $token = generateToken($student['ID']);
            echo json_encode(array("status" => "success", "message" => "Login successful", "token" => $token, "user" => array("id" => $student['ID'], "name" => $student['First Name'] . ' ' . $student['Last Name'], "email" => $student['Email'])));
        } else {
            echo json_encode(array("status" => "error", "message" => "Student not found"));
        }
    } elseif ($action === 'signup') {
        $firstName = mysqli_real_escape_string($con, $data['firstName']);
        $lastName = mysqli_real_escape_string($con, $data['lastName']);
        $email = mysqli_real_escape_string($con, $data['email']);
        $phone = mysqli_real_escape_string($con, $data['phone']);

        $checkStudent = mysqli_query($con, "SELECT * FROM student WHERE Email = '$email'");
        if (mysqli_num_rows($checkStudent) > 0) {
            echo json_encode(array("status" => "error", "message" => "Email already exists"));
        } else {
            $query = mysqli_query($con, "INSERT INTO student (`First Name`, `Last Name`, `Phone No.`, Email) VALUES ('$firstName', '$lastName', '$phone', '$email')");
            if ($query) {
                $studentId = mysqli_insert_id($con);
                $token = generateToken($studentId);
                echo json_encode(array("status" => "success", "message" => "Signup successful", "token" => $token, "user" => array("id" => $studentId, "name" => "$firstName $lastName", "email" => $email)));
            } else {
                logError("Signup failed: " . mysqli_error($con));
                echo json_encode(array("status" => "error", "message" => "Signup failed: " . mysqli_error($con)));
            }
        }
    } elseif ($action === 'logout') {
        echo json_encode(array("status" => "success", "message" => "Logout successful"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Invalid action"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>