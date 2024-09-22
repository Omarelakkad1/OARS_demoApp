<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = mysqli_query($con, "SELECT * FROM events");
    $events = array();

    if (mysqli_num_rows($query) > 0) {
        while ($row = mysqli_fetch_assoc($query)) {
            $events[] = array(
                'id' => $row['ID'],
                'title' => $row['Title'],
                'location' => $row['Location'],
                'date' => $row['Date'],
                'fee' => $row['Fee']
            );
        }
    }

    echo json_encode(array("status" => "success", "data" => $events));
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = $data['action'] ?? '';

    switch ($action) {
        case 'create':
            $title = mysqli_real_escape_string($con, $data['title']);
            $location = mysqli_real_escape_string($con, $data['location']);
            $date = mysqli_real_escape_string($con, $data['date']);
            $fee = floatval($data['fee']);

            $query = "INSERT INTO events (Title, Location, Date, Fee) VALUES ('$title', '$location', '$date', $fee)";
            if (mysqli_query($con, $query)) {
                echo json_encode(array("status" => "success", "message" => "Event created successfully"));
            } else {
                echo json_encode(array("status" => "error", "message" => "Failed to create event: " . mysqli_error($con)));
            }
            break;

        case 'update':
            $id = intval($data['id']);
            $title = mysqli_real_escape_string($con, $data['title']);
            $location = mysqli_real_escape_string($con, $data['location']);
            $date = mysqli_real_escape_string($con, $data['date']);
            $fee = floatval($data['fee']);

            $query = "UPDATE events SET Title='$title', Location='$location', Date='$date', Fee=$fee WHERE ID=$id";
            if (mysqli_query($con, $query)) {
                echo json_encode(array("status" => "success", "message" => "Event updated successfully"));
            } else {
                echo json_encode(array("status" => "error", "message" => "Failed to update event: " . mysqli_error($con)));
            }
            break;

        case 'delete':
            $id = intval($data['id']);

            $query = "DELETE FROM events WHERE ID=$id";
            if (mysqli_query($con, $query)) {
                echo json_encode(array("status" => "success", "message" => "Event deleted successfully"));
            } else {
                echo json_encode(array("status" => "error", "message" => "Failed to delete event: " . mysqli_error($con)));
            }
            break;

        default:
            echo json_encode(array("status" => "error", "message" => "Invalid action"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>