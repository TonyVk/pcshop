<?php
	include 'classes.php';
	$oConfig=new Configuration();
	try
	{
		$oConnection = new PDO("mysql:host=$oConfig->host;dbname=$oConfig->dbName", $oConfig->username, $oConfig->password);
	}
	catch (PDOException $pe)
	{
		die("Neuspjelo spajanje na $oConfig->dbName :" . $pe->getMessage());
	}
?>