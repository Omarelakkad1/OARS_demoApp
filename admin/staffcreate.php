<?php
session_start();
require("config.php");

if (!isset($_SESSION['auser'])) {
    header("location:index.php");
}

$message = "";

if (isset($_POST['submit'])) {
    $firstName = mysqli_real_escape_string($con, $_POST['FirstName']);
    $lastName = mysqli_real_escape_string($con, $_POST['LastName']);
    $phone = mysqli_real_escape_string($con, $_POST['Phone']);
    $email = mysqli_real_escape_string($con, $_POST['Email']);
    $password = mysqli_real_escape_string($con, $_POST['Password']);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO staff (FirstName, LastName, Phone, Email, Password) VALUES ('$firstName', '$lastName', '$phone', '$email', '$hashedPassword')";

    if (mysqli_query($con, $query)) {
        $message = "Staff member added successfully.";
    } else {
        $message = "Error: " . mysqli_error($con);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create Staff | Admin</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <?php include("header.php"); ?>
    <div class="page-wrapper">
        <div class="content container-fluid">
            <div class="page-header">
                <div class="row">
                    <div class="col">
                        <h3 class="page-title">Create Staff</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="staff.php">Staff</a></li>
                            <li class="breadcrumb-item active">Create Staff</li>
                        </ul>
                    </div>
                </div>
            </div>
            <?php if ($message != "") { ?>
                <div class="alert alert-info"><?php echo $message; ?></div>
            <?php } ?>
            <div class="row">
                <div class="col-md-12">
                    <form method="post" action="">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Staff Information</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="FirstName" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="LastName" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="Phone" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="Email" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" name="Password" class="form-control" required>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" name="submit" class="btn btn-primary">Create Staff</button>
                                <a href="staff.php" class="btn btn-secondary">Back to Staff List</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>