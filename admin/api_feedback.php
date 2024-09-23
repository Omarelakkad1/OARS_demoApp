<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

require_once 'config.php';

// Function to log errors
function logError($message) {
    error_log(date('[Y-m-d H:i:s] ') . $message . "\n", 3, 'feedback_error.log');
}

// Check if the connection was successful
if (!$con) {
    $error = 'Database connection failed: ' . mysqli_connect_error();
    logError($error);
    http_response_code(500);
    echo json_encode(['error' => $error]);
    exit;
}

// Debug: Check table structure
$table_check_query = "DESCRIBE feedback_form";
$table_check_result = mysqli_query($con, $table_check_query);
if ($table_check_result) {
    $columns = [];
    while ($row = mysqli_fetch_assoc($table_check_result)) {
        $columns[] = $row['Field'];
    }
    logError("Feedback form table structure: " . print_r($columns, true));
} else {
    $error = "Error checking table structure: " . mysqli_error($con);
    logError($error);
    echo json_encode(['error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Debug: Log received data
    logError("Received data: " . print_r($data, true));

    $name = $con->real_escape_string($data['name'] ?? '');
    $email = $con->real_escape_string($data['email'] ?? '');
    $title = $con->real_escape_string($data['title'] ?? '');
    $description = $con->real_escape_string($data['description'] ?? '');

    if (empty($name) || empty($email) || empty($title) || empty($description)) {
        $error = "Missing required fields";
        logError($error);
        http_response_code(400);
        echo json_encode(['error' => $error]);
        exit;
    }

    // For now, we'll use a placeholder StudentID of 1. In a real application, you'd get this from the logged-in user's session.
    $studentId = 1;

    $query = "INSERT INTO feedback_form (StudentID, Name, Email, Title, Description, `Submission Date`) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $con->prepare($query);

    if ($stmt === false) {
        $error = "Error preparing statement: " . $con->error;
        logError($error);
        http_response_code(500);
        echo json_encode(['error' => $error]);
        exit;
    }

    $stmt->bind_param("issss", $studentId, $name, $email, $title, $description);

    if ($stmt->execute()) {
        $success_message = "Feedback inserted successfully. ID: " . $stmt->insert_id;
        logError($success_message);
        echo json_encode(['message' => 'Feedback submitted successfully', 'id' => $stmt->insert_id]);
    } else {
        $error = "Error submitting feedback: " . $stmt->error;
        logError($error);
        http_response_code(500);
        echo json_encode(['error' => $error]);
    }

    $stmt->close();
} else {
    $error = "Invalid request method: " . $_SERVER['REQUEST_METHOD'];
    logError($error);
    http_response_code(405);
    echo json_encode(['error' => $error]);
}

$con->close();
?>