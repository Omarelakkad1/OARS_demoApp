<?php
include("config.php");
$uid = $_GET['id'];

// view code//
$sql = "SELECT * FROM staff where ID ='$uid'";
$result = mysqli_query($con, $sql);


//end view code
$msg="";
$sql = "DELETE FROM staff WHERE ID = {$uid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>Agent Deleted</p>";
	header("Location:staff.php?msg=$msg");
}
else
{
	$msg="<p class='alert alert-warning'>Agent not Deleted</p>";
		header("Location:staff.php?msg=$msg");
}

mysqli_close($con);
?>
