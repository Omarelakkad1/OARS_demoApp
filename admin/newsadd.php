<?php
session_start();
require("config.php");
////code
 
if(!isset($_SESSION['auser']))
{
	header("location:index.php");
}

$error="";
$msg="";
if(isset($_POST['add']))
{
	
    $title = mysqli_real_escape_string($con, $_POST['title']);
    $content = mysqli_real_escape_string($con, $_POST['content']);
    $date = mysqli_real_escape_string($con, $_POST['date']);
	
	$sql="INSERT INTO news (title,content,time_created) VALUES('$title','$content','$date')";
	$result=mysqli_query($con,$sql);
	if($result)
		{
			$msg="<p class='alert alert-success'>News Inserted Successfully</p>";
					
		}
		else
		{
			$error="<p class='alert alert-warning'>Something went wrong. Please try again</p>";
		}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
        <title>NewsAdd | Admin</title>
		
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
								<h3 class="page-title">News</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
									<li class="breadcrumb-item active">News</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /Page Header -->
					
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">Add News Details</h4>
								</div>
								<form method="post" enctype="multipart/form-data">
									
								<div class="card-body">
									<h5 class="card-title">News Detail</h5>
									<?php echo $error; ?>
									<?php echo $msg; ?>
									
										<div class="row">
											<div class="col-xl-12">
												<div class="form-group row">
													<label class="col-lg-2 col-form-label">Title</label>
													<div class="col-lg-9">
														<input type="text" class="form-control" name="title" required placeholder="Enter Title">
													</div>
												</div>
											</div>
										</div>
										<h4 class="card-title">Content</h4>
										<div class="row">
											<div class="col-xl-6">
												
												<div class="form-group row">
													<label class="col-lg-3 col-form-label">Content</label>
													<div class="col-lg-9">
														<input type="text" class="form-control" name="content" required placeholder="Enter Fee">
													</div>
												</div>
												<div class="form-group row">
													<label class="col-lg-3 col-form-label">Date</label>
													<div class="col-lg-9">
													<input type="text" class="form-control" name="date" required placeholder="Enter Date">
													</div>
												</div>
											
											</div>
									
										</div>
										<hr>
			<input type="submit" value="Submit" class="btn btn-primary"name="add" style="margin-left:200px;">
										
								</div>
								</form>
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
		
		<script  src="assets/js/script.js"></script>
		
    </body>

</html>