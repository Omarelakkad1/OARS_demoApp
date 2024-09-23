<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require("config.php");

function generateToken($userId, $role) {
    return bin2hex(random_bytes(16)) . '_' . $userId . '_' . $role;
}

function logError($message) {
    error_log(date('[Y-m-d H:i:s] ') . $message . "\n", 3, 'api_errors.log');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = isset($data['action']) ? $data['action'] : '';

    if ($action === 'login') {
        $email = mysqli_real_escape_string($con, $data['email']);
        $password = $data['password'];

        // Check staff table first
        $query = mysqli_query($con, "SELECT * FROM staff WHERE Email = '$email'");
        if ($staff = mysqli_fetch_assoc($query)) {
            if (password_verify($password, $staff['Password'])) {
                $token = generateToken($staff['ID'], 'staff');
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Login successful",
                    "token" => $token,
                    "user" => array(
                        "id" => $staff['ID'],
                        "name" => $staff['FirstName'] . ' ' . $staff['LastName'],
                        "email" => $staff['Email'],
                        "role" => "staff"
                    )
                ));
                exit();
            }
        }

        // If not found in staff, check student table
        $query = mysqli_query($con, "SELECT * FROM student WHERE Email = '$email'");
        if ($student = mysqli_fetch_assoc($query)) {
            if (password_verify($password, $student['Password'])) {
                $token = generateToken($student['ID'], 'student');
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Login successful",
                    "token" => $token,
                    "user" => array(
                        "id" => $student['ID'],
                        "name" => $student['First Name'] . ' ' . $student['Last Name'],
                        "email" => $student['Email'],
                        "role" => "student"
                    )
                ));
            } else {
                echo json_encode(array("status" => "error", "error" => "Invalid credentials"));
            }
        } else {
            echo json_encode(array("status" => "error", "error" => "Account not found"));
        }
    } elseif ($action === 'signup') {
        $firstName = mysqli_real_escape_string($con, $data['firstName']);
        $lastName = mysqli_real_escape_string($con, $data['lastName']);
        $email = mysqli_real_escape_string($con, $data['email']);
        $phone = mysqli_real_escape_string($con, $data['phone']);
        $password = $data['password'];

        $checkStudent = mysqli_query($con, "SELECT * FROM student WHERE Email = '$email'");
        $checkStaff = mysqli_query($con, "SELECT * FROM staff WHERE Email = '$email'");
        if (mysqli_num_rows($checkStudent) > 0 || mysqli_num_rows($checkStaff) > 0) {
            echo json_encode(array("status" => "error", "message" => "Email already exists"));
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $query = mysqli_query($con, "INSERT INTO student (`First Name`, `Last Name`, `Phone No.`, Email, Password) VALUES ('$firstName', '$lastName', '$phone', '$email', '$hashedPassword')");
            if ($query) {
                $studentId = mysqli_insert_id($con);
                $token = generateToken($studentId, 'student');
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Signup successful",
                    "token" => $token,
                    "user" => array(
                        "id" => $studentId,
                        "name" => "$firstName $lastName",
                        "email" => $email,
                        "role" => "student"
                    )
                ));
            } else {
                $error = mysqli_error($con);
                logError("Signup failed: " . $error);
                echo json_encode(array("status" => "error", "message" => "Signup failed: " . $error));
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