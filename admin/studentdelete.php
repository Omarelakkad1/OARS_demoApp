<?php
include("config.php");

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    $msg = urlencode("Invalid student ID");
    header("Location: student.php?msg=$msg");
    exit();
}

$uid = intval($_GET['id']);

mysqli_begin_transaction($con);

try {
    // Update constraints
    $update_constraints_sql = file_get_contents('update_constraints.sql');
    $statements = explode(';', $update_constraints_sql);
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            if (!mysqli_query($con, $statement)) {
                throw new Exception("Error updating constraints: " . mysqli_error($con));
            }
        }
    }

    // Delete student
    $sql = "DELETE FROM student WHERE id = ?";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, "i", $uid);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        mysqli_commit($con);
        $msg = urlencode("Student successfully deleted");
    } else {
        throw new Exception("Failed to delete student");
    }
} catch (Exception $e) {
    mysqli_rollback($con);
    $msg = urlencode("Error: " . $e->getMessage());
} finally {
    mysqli_close($con);
}

header("Location: student.php?msg=$msg");
exit();
?>
