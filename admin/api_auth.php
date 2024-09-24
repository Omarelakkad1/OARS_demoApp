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

function sanitizeInput($input) {
    if (is_array($input)) {
        foreach($input as $key => $value) {
            $input[$key] = sanitizeInput($value);
        }
    } else {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }
    return $input;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitizeInput($data);
    $action = isset($data['action']) ? $data['action'] : '';

    if ($action === 'login') {
        $email = $data['email'];
        $password = $data['password'];

        // Check staff table first
        $stmt = $con->prepare("SELECT * FROM staff WHERE Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $staff = $result->fetch_assoc();
        $stmt->close();

        if ($staff && password_verify($password, $staff['Password'])) {
            $token = generateToken($staff['ID'], 'staff');
            echo json_encode(array(
                "status" => "success",
                "message" => "Login successful",
                "token" => $token,
                "user" => array(
                    "id" => $staff['ID'],
                    "name" => htmlspecialchars($staff['FirstName'] . ' ' . $staff['LastName'], ENT_QUOTES, 'UTF-8'),
                    "email" => htmlspecialchars($staff['Email'], ENT_QUOTES, 'UTF-8'),
                    "role" => "staff"
                )
            ));
            exit();
        }

        // If not found in staff, check student table
        $stmt = $con->prepare("SELECT * FROM student WHERE Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $student = $result->fetch_assoc();
        $stmt->close();

        if ($student && password_verify($password, $student['Password'])) {
            $token = generateToken($student['ID'], 'student');
            echo json_encode(array(
                "status" => "success",
                "message" => "Login successful",
                "token" => $token,
                "user" => array(
                    "id" => $student['ID'],
                    "name" => htmlspecialchars($student['First Name'] . ' ' . $student['Last Name'], ENT_QUOTES, 'UTF-8'),
                    "email" => htmlspecialchars($student['Email'], ENT_QUOTES, 'UTF-8'),
                    "role" => "student"
                )
            ));
        } else {
            echo json_encode(array("status" => "error", "error" => "Invalid credentials"));
        }
    } elseif ($action === 'signup') {
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $phone = $data['phone'];
        $password = $data['password'];

        // Check if email already exists
        $stmt = $con->prepare("SELECT * FROM student WHERE Email = ? UNION SELECT * FROM staff WHERE Email = ?");
        $stmt->bind_param("ss", $email, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result->num_rows > 0) {
            echo json_encode(array("status" => "error", "message" => "Email already exists"));
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $con->prepare("INSERT INTO student (`First Name`, `Last Name`, `Phone No.`, Email, Password) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $firstName, $lastName, $phone, $email, $hashedPassword);
            
            if ($stmt->execute()) {
                $studentId = $stmt->insert_id;
                $token = generateToken($studentId, 'student');
                echo json_encode(array(
                    "status" => "success",
                    "message" => "Signup successful",
                    "token" => $token,
                    "user" => array(
                        "id" => $studentId,
                        "name" => htmlspecialchars("$firstName $lastName", ENT_QUOTES, 'UTF-8'),
                        "email" => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
                        "role" => "student"
                    )
                ));
            } else {
                $error = $stmt->error;
                logError("Signup failed: " . $error);
                echo json_encode(array("status" => "error", "message" => "Signup failed: " . $error));
            }
            $stmt->close();
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