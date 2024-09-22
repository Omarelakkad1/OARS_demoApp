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

function checkMemberStatus($con, $email) {
    $email = mysqli_real_escape_string($con, $email);
    $query = "SELECT m.ID FROM member m JOIN student s ON m.StudentID = s.ID WHERE s.Email = '$email'";
    $result = mysqli_query($con, $query);
    return mysqli_num_rows($result) > 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'check_status') {
        $email = $_GET['email'];
        $isRegistered = checkMemberStatus($con, $email);
        echo json_encode(array("status" => "success", "isRegistered" => $isRegistered));
    } else {
        $query = mysqli_query($con, "SELECT m.*, s.`First Name`, s.`Last Name`, s.`Phone No.`, s.Email FROM member m JOIN student s ON m.StudentID = s.ID");
        $members = array();

        while ($row = mysqli_fetch_assoc($query)) {
            $members[] = array(
                'id' => $row['ID'],
                'studentId' => $row['StudentID'],
                'firstName' => $row['First Name'],
                'lastName' => $row['Last Name'],
                'phone' => $row['Phone No.'],
                'email' => $row['Email']
            );
        }

        echo json_encode(array("status" => "success", "data" => $members));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $firstName = mysqli_real_escape_string($con, $data['firstName']);
    $lastName = mysqli_real_escape_string($con, $data['lastName']);
    $phone = mysqli_real_escape_string($con, $data['phone']);
    $email = mysqli_real_escape_string($con, $data['email']);

    if (checkMemberStatus($con, $email)) {
        echo json_encode(array("status" => "error", "message" => "You are already a registered member"));
    } else {
        // First, check if the student already exists
        $query = "SELECT ID FROM student WHERE Email = '$email'";
        $result = mysqli_query($con, $query);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $studentId = $row['ID'];
        } else {
            // If not, insert into student table
            $query = "INSERT INTO student (`First Name`, `Last Name`, `Phone No.`, Email) VALUES ('$firstName', '$lastName', '$phone', '$email')";
            if (mysqli_query($con, $query)) {
                $studentId = mysqli_insert_id($con);
            } else {
                echo json_encode(array("status" => "error", "message" => "Error registering student: " . mysqli_error($con)));
                exit();
            }
        }

        // Then, insert into member table
        $query = "INSERT INTO member (StudentID, FirstName, LastName) VALUES ('$studentId', '$firstName', '$lastName')";
        
        if (mysqli_query($con, $query)) {
            echo json_encode(array("status" => "success", "message" => "Member registered successfully"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error registering member: " . mysqli_error($con)));
        }
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>