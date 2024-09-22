<?php
include("config.php");
$uid = $_GET['id'];

// view code//
$sql = "SELECT * FROM student where id='$uid'";
$result = mysqli_query($con, $sql);


//end view code
$msg="";
$sql = "DELETE FROM student WHERE id = {$uid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>User Deleted</p>";
	header("Location:student.php?msg=$msg");
}
else
{
	$msg="<p class='alert alert-warning'>User not Deleted</p>";
		header("Location:student.php?msg=$msg");
}

mysqli_close($con);
?>
