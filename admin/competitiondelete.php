<?php
include("config.php");
$cid = $_GET['id'];
$sql = "DELETE FROM competition WHERE id = {$cid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>Competition Deleted</p>";
	header("Location:competitionview.php?msg=$msg");
}
else{
	$msg="<p class='alert alert-warning'>Competition Not Deleted</p>";
	header("Location:competitionview.php?msg=$msg");
}
mysqli_close($con);
?>