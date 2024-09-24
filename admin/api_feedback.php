<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

require_once 'config.php';

function logError($message) {
    error_log(date('[Y-m-d H:i:s] ') . $message . "\n", 3, 'feedback_error.log');
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

if (!$con) {
    logError('Database connection failed: ' . mysqli_connect_error());
    http_response_code(500);
    echo json_encode(['error' => 'An internal server error occurred.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitizeInput($data);

    logError("Received data: " . print_r($data, true));

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';

    if (empty($name) || empty($email) || empty($title) || empty($description)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit;
    }

    if (strlen($title) > 255 || strlen($description) > 1000) {
        http_response_code(400);
        echo json_encode(['error' => 'Title or description is too long.']);
        exit;
    }

    $query = "INSERT INTO feedback_form (Name, Email, Title, Description, `Submission Date`) VALUES (?, ?, ?, ?, NOW())";
    $stmt = $con->prepare($query);

    if ($stmt === false) {
        logError("Error preparing statement: " . $con->error);
        http_response_code(500);
        echo json_encode(['error' => 'An internal server error occurred.']);
        exit;
    }

    $stmt->bind_param("ssss", $name, $email, $title, $description);

    if ($stmt->execute()) {
        $success_message = "Feedback inserted successfully. ID: " . $stmt->insert_id;
        logError($success_message);
        echo json_encode([
            'message' => 'Feedback submitted successfully',
            'id' => $stmt->insert_id,
            'feedback' => [
                'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
                'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
                'title' => htmlspecialchars($title, ENT_QUOTES, 'UTF-8'),
                'description' => htmlspecialchars($description, ENT_QUOTES, 'UTF-8')
            ]
        ]);
    } else {
        logError("Error submitting feedback: " . $stmt->error);
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred while submitting your feedback. Please try again later.']);
    }

    $stmt->close();
} else {
    logError("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}

$con->close();
?>