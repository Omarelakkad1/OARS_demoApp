<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require("config.php");

function logMessage($message) {
    error_log(date('[Y-m-d H:i:s] ') . "API_EVENTS: " . $message . "\n", 3, "api_events.log");
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        logMessage("Fetching events");
        $query = mysqli_query($con, "SELECT * FROM events");
        if (!$query) {
            throw new Exception(mysqli_error($con));
        }
        $events = array();

        while ($row = mysqli_fetch_assoc($query)) {
            $events[] = array(
                'id' => $row['ID'],
                'title' => $row['Title'],
                'location' => $row['Location'],
                'date' => $row['Date'],
                'fee' => intval($row['Fee'])
            );
        }

        logMessage("Events fetched successfully: " . json_encode($events));
        echo json_encode(array("status" => "success", "data" => $events));
    } catch (Exception $e) {
        logMessage("Error fetching events: " . $e->getMessage());
        echo json_encode(array("status" => "error", "message" => "Failed to fetch events: " . $e->getMessage()));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Invalid JSON: " . json_last_error_msg());
        }
        $action = $data['action'] ?? '';

        logMessage("Received POST request with action: " . $action);

        switch ($action) {
            case 'create':
                $title = mysqli_real_escape_string($con, $data['title']);
                $location = mysqli_real_escape_string($con, $data['location']);
                $date = mysqli_real_escape_string($con, $data['date']);
                $fee = intval($data['fee']);

                $query = "INSERT INTO events (Title, Location, Date, Fee) VALUES ('$title', '$location', '$date', $fee)";
                if (!mysqli_query($con, $query)) {
                    throw new Exception(mysqli_error($con));
                }
                logMessage("Event created successfully");
                echo json_encode(array("status" => "success", "message" => "Event created successfully"));
                break;

            case 'update':
                $id = intval($data['id']);
                $title = mysqli_real_escape_string($con, $data['title']);
                $location = mysqli_real_escape_string($con, $data['location']);
                $date = mysqli_real_escape_string($con, $data['date']);
                $fee = intval($data['fee']);

                $query = "UPDATE events SET Title='$title', Location='$location', Date='$date', Fee=$fee WHERE ID=$id";
                if (!mysqli_query($con, $query)) {
                    throw new Exception(mysqli_error($con));
                }
                logMessage("Event updated successfully");
                echo json_encode(array("status" => "success", "message" => "Event updated successfully"));
                break;

            case 'delete':
                $id = intval($data['id']);

                $query = "DELETE FROM events WHERE ID=$id";
                if (!mysqli_query($con, $query)) {
                    throw new Exception(mysqli_error($con));
                }
                logMessage("Event deleted successfully");
                echo json_encode(array("status" => "success", "message" => "Event deleted successfully"));
                break;

            default:
                throw new Exception("Invalid action");
        }
    } catch (Exception $e) {
        logMessage("Error processing POST request: " . $e->getMessage());
        echo json_encode(array("status" => "error", "message" => "Operation failed: " . $e->getMessage()));
    }
} else {
    logMessage("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>