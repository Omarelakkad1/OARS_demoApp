<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = mysqli_query($con, "SELECT * FROM events");
    $events = array();

    while ($row = mysqli_fetch_assoc($query)) {
        $events[] = array(
            'id' => $row['ID'],
            'title' => $row['Title'],
            'location' => $row['Location'],
            'date' => $row['Date'],
            'fee' => $row['Fee']
        );
    }

    echo json_encode(array("status" => "success", "data" => $events));
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>