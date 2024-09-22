<?php
session_start();
require("config.php");
////code

if (!isset($_SESSION['auser'])) {
	header("location:index.php");
}

$error = "";
$msg = "";

if (isset($_POST['add'])) {
    $eid = $_GET['id']; 

    $title = mysqli_real_escape_string($con, $_POST['title']);
    $loc = mysqli_real_escape_string($con, $_POST['location']);
    $date = mysqli_real_escape_string($con, $_POST['date']);
    $fee = floatval($_POST['fee']); 


    $sql = "UPDATE events SET title = '{$title}',  location = '{$loc}',   date = '{$date}', fee = '{$fee}'  WHERE id = {$eid}";

    $result = mysqli_query($con, $sql);

    if ($result == true) {
        $msg = "<p class='alert alert-success'>Event Updated</p>";
        header("Location:eventview.php?msg=" . urlencode($msg));
        exit();
    } else {
        $msg = "<p class='alert alert-warning'>Event Not Updated</p>";
        header("Location:eventview.php?msg=" . urlencode($msg));
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
	<title>EventEdit | Admin</title>

	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">

	<!-- Fontawesome CSS -->
	<link rel="stylesheet" href="assets/css/font-awesome.min.css">

	<!-- Feathericon CSS -->
	<link rel="stylesheet" href="assets/css/feathericon.min.css">

	<!-- Main CSS -->
	<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>


	<!-- Header -->
	<?php include("header.php"); ?>
	<!-- /Sidebar -->

	<!-- Page Wrapper -->
	<div class="page-wrapper">
		<div class="content container-fluid">

			<!-- Page Header -->
			<div class="page-header">
				<div class="row">
					<div class="col">
						<h3 class="page-title">Event</h3>
						<ul class="breadcrumb">
							<li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
							<li class="breadcrumb-item active">Event</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- /Page Header -->

			<div class="row">
				<div class="col-md-12">
					<div class="card">
						<div class="card-header">
							<h4 class="card-title">Update Event Details</h4>
							<?php echo $error; ?>
							<?php echo $msg; ?>
						</div>
						<form method="post" enctype="multipart/form-data">

							<?php

							$eid = $_REQUEST['id'];
							$query = mysqli_query($con, "select * from events where id='$eid'");
							while ($row = mysqli_fetch_row($query)) {
								?>

								<div class="card-body">
									<h5 class="card-title">Event Detail</h5>
									<div class="row">
										<div class="col-xl-12">
											<div class="form-group row">
												<label class="col-lg-2 col-form-label">Title</label>
												<div class="col-lg-9">
													<input type="text" class="form-control" name="title" required
														value="<?php echo $row['1']; ?>">
												</div>
											</div>
											<h4 class="card-title">Fee & Location</h4>
											<div class="row">
												<div class="col-xl-6">

													<div class="form-group row">
														<label class="col-lg-3 col-form-label">Fee</label>
														<div class="col-lg-9">
															<input type="text" class="form-control" name="fee" required
																value="<?php echo $row['4']; ?>">
														</div>
													</div>
													<div class="form-group row">
														<label class="col-lg-3 col-form-label">Location</label>
														<div class="col-lg-9">
															<input type="text" class="form-control" name="location" required
																value="<?php echo $row['2']; ?>">
														</div>
													</div>

												</div>


												<div class="form-group row">
													<label class="col-lg-3 col-form-label">Date</label>
													<div class="col-lg-9">
														<input type="text" class="form-control" name="date" required
															value="<?php echo $row['3']; ?>">
													</div>
												</div>

											</div>
										</div>





										<hr>




										<input type="submit" value="Submit" class="btn btn-primary" name="add"
											style="margin-left:200px;">

									</div>
							</form>

							<?php
							}
							?>

					</div>
				</div>
			</div>

		</div>
	</div>
	<!-- /Main Wrapper -->


	<!-- jQuery -->
	<script src="assets/js/jquery-3.2.1.min.js"></script>
	<script src="assets/plugins/tinymce/tinymce.min.js"></script>
	<script src="assets/plugins/tinymce/init-tinymce.min.js"></script>
	<!-- Bootstrap Core JS -->
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>

	<!-- Slimscroll JS -->
	<script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

	<script src="assets/js/script.js"></script>

</body>

</html>