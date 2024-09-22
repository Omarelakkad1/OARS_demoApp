<?php
include("config.php");
$eid = $_GET['id'];
$sql = "DELETE FROM events WHERE id = {$eid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>Event Deleted</p>";
	header("Location:eventview.php?msg=$msg");
}
else{
	$msg="<p class='alert alert-warning'>Event Not Deleted</p>";
	header("Location:eventview.php?msg=$msg");
}
mysqli_close($con);
?>