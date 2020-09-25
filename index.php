<?php
    session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>PCShop</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" href="assets/plugins/bootstrap-3.3.7-dist/css/bootstrap.min.css">
		<script src="assets/plugins/angularjs/angular.min.js"></script>
		<script src="assets/plugins/angularjs/angular-route.min.js"></script>
		<script src="assets/plugins/jquery/jquery-3.3.1.min.js"></script>
		<script src="assets/plugins/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	</head>
	<body ng-app="pocetna-app" style="background-image: url(slike/pozadina.jpg); background-position: center; background-repeat: no-repeat;">
		<nav class="navbar navbar-default navbar-fixed-top">
		  	<div class="container-fluid">
			    <div class="navbar-header">
			    	<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-navbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
			      	<a class="navbar-brand" href="#!/naslovna"><img src="slike/logo.png" id="logo"></a>
			    </div>
			    <div class="collapse navbar-collapse" id="main-navbar">
				    <ul class="nav navbar-nav">
				      	<li id="navigacija"><a href="#!/naslovna">Pocetna</a></li>
				      	<li id="navigacija"><a href="#!/kracuna">Kreiranje racuna</a></li>
				      	<li id="navigacija"><a href="#!/pracuna">Pregled racuna</a></li>
				      	<li id="navigacija" style="display: none" class="dropdown">
					        <a class="dropdown-toggle" data-toggle="dropdown" href="">Administracija
					        <span class="caret"></span></a>
					        <ul class="dropdown-menu">
					          	<li><a href="#!/admin">Zaposlenici</a></li>
					          	<li><a href="#!/admin2">Kategorije</a></li>
					        </ul>
				      	</li>
				    </ul>
				    <ul class="nav navbar-nav navbar-right" ng-controller="naslovniController">
				      	<li id="odjava"><a href="#" ng-click="Logout()">Odjava</a></li>
				    </ul>
				</div>
			</div>
		</nav>
		<div class="container-fluid">
			<div ng-view></div>
		</div>
		<script src="js/app.js"></script>
	</body>
</html>