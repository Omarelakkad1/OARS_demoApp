<?php
include("config.php");
$nid = $_GET['id'];
$sql = "DELETE FROM news WHERE ID = {$nid}";
$result = mysqli_query($con, $sql);
if($result == true)
{
	$msg="<p class='alert alert-success'>News Deleted</p>";
	header("Location:newsview.php?msg=$msg");
}
else{
	$msg="<p class='alert alert-warning'>News Not Deleted</p>";
	header("Location:newsview.php?msg=$msg");
}
mysqli_close($con);
?>
