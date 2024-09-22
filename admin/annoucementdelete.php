<?php
include("config.php");
$aid = $_GET['id'];
$sql = "DELETE FROM announcements WHERE ID = {$aid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>Annoucement Deleted</p>";
	header("Location:annoucementview.php?msg=$msg");
}
else{
	$msg="<p class='alert alert-warning'>Annoucement Not Deleted</p>";
	header("Location:annoucementview.php?msg=$msg");
}
mysqli_close($con);
?>
