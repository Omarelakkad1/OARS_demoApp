<?php
include("config.php");
$uid = $_GET['id'];

// view code//
$sql = "SELECT * FROM member where id='$uid'";
$result = mysqli_query($con, $sql);


//end view code
$msg="";
$sql = "DELETE FROM member WHERE id = {$uid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>Builder Deleted</p>";
	header("Location:member.php?msg=$msg");
}
else
{
	$msg="<p class='alert alert-warning'>Builder not Deleted</p>";
		header("Location:member.php?msg=$msg");
}

mysqli_close($con);
?>
