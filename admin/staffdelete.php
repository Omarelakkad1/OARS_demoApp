<?php
session_start();
require("config.php");

if(!isset($_SESSION['auser']))
{
	header("location:index.php");
	exit();
}

if(isset($_GET['id']))
{
	$id = intval($_GET['id']);
	
	$query = mysqli_query($con, "DELETE FROM staff WHERE ID = '$id'");
	
	if($query)
	{
		$msg = "Staff member deleted successfully";
	}
	else
	{
		$msg = "Error deleting staff member";
	}
}
else
{
	$msg = "Invalid request";
}

header("location:staff.php?msg=".urlencode($msg));
exit();
?>
