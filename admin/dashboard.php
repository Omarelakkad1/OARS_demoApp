<?php
session_start();
require("config.php");
////code
 
if(!isset($_SESSION['auser']))
{
	header("location:index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
        <title>Dashboard | Admin</title>
		
		<!-- Favicon -->
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">
		
		<!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
		
		<!-- Fontawesome CSS -->
        <link rel="stylesheet" href="assets/css/font-awesome.min.css">
		
		<!-- Feathericon CSS -->
        <link rel="stylesheet" href="assets/css/feathericon.min.css">
		
		<link rel="stylesheet" href="assets/plugins/morris/morris.css">
		
		<!-- Main CSS -->
        <link rel="stylesheet" href="assets/css/style.css">
		

    </head>
    <body>
	
		<!-- Main Wrapper -->

		
			<!-- Header -->
				<?php include("header.php"); ?>
			<!-- /Header -->
			
			<!-- Page Wrapper -->
            <div class="page-wrapper">
			
                <div class="content container-fluid">
					
					<!-- Page Header -->
					<div class="page-header">
						<div class="row">
							<div class="col-sm-12">
								<h3 class="page-title">Welcome Admin!</h3>
								<p></p>
								<ul class="breadcrumb">
									<li class="breadcrumb-item active">Dashboard</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /Page Header -->

					<div class="row">
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-primary">
											<i class="fe fe-users"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
										<h3><?php $sql = "SELECT * FROM student";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Student</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-primary w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-success">
											<i class="fe fe-users"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM staff";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Staff</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-success w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-danger">
											<i class="fe fe-user"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM member";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Member</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-danger w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-info">
											<i class="fa fa-calendar"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM events WHERE `date` BETWEEN CURDATE() - INTERVAL 10 DAY AND CURDATE();";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Event</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-warning">
											<i class="fa fa-futbol-o"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM competition WHERE `date` BETWEEN CURDATE() - INTERVAL 10 DAY AND CURDATE();";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Competition</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-info">
											<i class="fa fa-futbol-o"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM competition WHERE `date` < NOW() - INTERVAL 10 DAY;";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Past Competition</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-secondary">
											<i class="fa fa-calendar"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM events WHERE `date` < NOW() - INTERVAL 10 DAY;";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Past Event</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-primary">
											<i class="fa fa-comment"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM feedback_form";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Feedback</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-success">
											<i class="fa fa-newspaper-o"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM news";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">News</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card">
								<div class="card-body">
									<div class="dash-widget-header">
										<span class="dash-widget-icon bg-info">
											<i class="fa fa-newspaper-o"></i>
										</span>
										
									</div>
									<div class="dash-widget-info">
										
									<h3><?php $sql = "SELECT * FROM announcements";
										$query = $con->query($sql);
                						echo "$query->num_rows";?></h3>
										
										<h6 class="text-muted">Announcement</h6>
										<div class="progress progress-sm">
											<div class="progress-bar bg-info w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>			
			</div>
			<!-- /Page Wrapper -->
		

		<!-- /Main Wrapper -->
		
		<!-- jQuery -->
        <script src="assets/js/jquery-3.2.1.min.js"></script>
		
		<!-- Bootstrap Core JS -->
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
		
		<!-- Slimscroll JS -->
        <script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
		
		<script src="assets/plugins/raphael/raphael.min.js"></script>    
		<script src="assets/plugins/morris/morris.min.js"></script>  
		<script src="assets/js/chart.morris.js"></script>
		
	
		<script  src="assets/js/script.js"></script>
		
    </body>

</html>
