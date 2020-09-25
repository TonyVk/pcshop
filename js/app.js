var oPocetnaModul = angular.module('pocetna-app', ['ngRoute']);

oPocetnaModul.config(function($routeProvider){
    $routeProvider.when('/', {
		templateUrl: 'predlosci/login.html',
		controller: 'naslovniController'
	});
	$routeProvider.when('/naslovna', {
		templateUrl: 'predlosci/naslovna.html',
		controller: 'naslovniController'
	});
	$routeProvider.when('/kracuna', {
	    templateUrl: 'predlosci/kracuna.html',
	    controller: 'kracunaController'
	});
	$routeProvider.when('/pracuna', {
	    templateUrl: 'predlosci/pracuna.html',
	    controller: 'pracunaController'
	});
	$routeProvider.when('/admin', {
	    templateUrl: 'predlosci/admin.html',
	    controller: 'adminController'
	});
	$routeProvider.when('/admin2', {
	    templateUrl: 'predlosci/admin2.html',
	    controller: 'adminController'
	});
	$routeProvider.otherwise({
		template:'Doslo je do pogreske'
	});
});

oPocetnaModul.controller('naslovniController', function ($scope, $http, $location) {
	$http.post('action.php', {action_id: 'provjera_logina'})
    .then
    (
    	function (response) 
    	{
	    	if( response.data == 1 )
	    	{
	    		$("#odjava").show();
	    		$http.post('action.php', {action_id: 'provjera_pozicije'})
			    .then
			    (
			    	function (response) 
			    	{
				    	if( response.data == 1 )
				    	{
				    		$("#navigacija:nth-child(4)").show();
				    	}
				    	else
				    	{
				    		$("#navigacija:nth-child(4)").hide();
				    	}
				        
				    },
				    function (e) 
				    {
				    	console.log('error');
				 	}
				);
	    	}
	    	else
	    	{
	    		$("#odjava").hide();
	    		$location.path('/');
	    	}
	        
	    },
	    function (e) 
	    {
	    	console.log('error');
	 	}
	);
	$scope.oArtikli = [];
	$scope.oKategorije = [];
	$scope.Greska = "";
	$("#navigacija:nth-child(1)").addClass( "active" );
	$("#navigacija:nth-child(2)").removeClass( "active" );
	$("#navigacija:nth-child(3)").removeClass( "active" );
	$("#navigacija:nth-child(4)").removeClass( "active" );
	$scope.DohvatiArtikle = function()
	{
		$http({
	        method : "GET",
	        url:'json.php?json_id=dohvati_artikle'
	    }).then(function(response) {
	        $scope.oArtikli = response.data;
	    },function (response) {
	        console.log('Doslo je do pogreske');
	    });
	};
    $scope.DohvatiArtikle();
	$http({
        method : "GET",
        url:'json.php?json_id=dohvati_kategorije'
    }).then(function(response) {
        $scope.oKategorije = response.data;
    },function (response) {
        console.log('Doslo je do pogreske');
    });
    $http({
        method : "GET",
        url:'json.php?json_id=dohvati_zaposlenike'
    }).then(function(response) {
        $scope.oZaposlenici = response.data;
    },function (response) {
        console.log('Doslo je do pogreske');
    });
	$scope.fKategorije = function(artikl)
	{
		if($scope.izabranaKategorija != null)
		{
			if(artikl.kategorija.sifra == $scope.izabranaKategorija.sifra)
			{
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	};
	$scope.fRacunDeaktiviran = function(zap)
	{
		console.log(zap);
		if(zap.deaktiviran == 0 || zap.deaktiviran == "N/A")
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	$scope.Login = function()
	{
		var oData = {
			'action_id': 'login',
			'username': $scope.Username,
			'sifra': $scope.Sifra
		};

	    $http.post('action.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
		    	if( response.data == 1 )
		    	{
		    		$location.path('/naslovna');
		    	}
		    	else
		    	{
		    		$scope.Poruka = "Netočni podaci. Pokušajte ponovno";
					$('#obavijest').modal
					({
						show: true
					});
		    	}
		    },
		    function (e) 
		    {
		    	console.log('error');
		 	}
		);
	};
	$scope.Logout = function()
	{
		var oData = {
			'action_id': 'logout'
		};
		$http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
		    		$location.path('/');
		    		$("#navigacija:nth-child(4)").hide();
			    },
			    function (e) 
			    {
			    	console.log('error');
			 	}
		);
	}
	$scope.GetModal = function(naziv, artikl)
	{
		if($scope.Greska == "")
		{
			$("#greska").hide();
			$("#greska2").hide();
		}
		if(naziv == "dodaj")
		{
			$('#dodajartikl').modal
			({
				show: true
			});
		}
		else if(naziv == "uredi")
		{
			$scope.inpUrNaziv = artikl.naziv;
			$scope.inpUrOpis = artikl.opis;
			$scope.inpUrCijena = parseInt(artikl.jedinicnacijena);
			$scope.inpUrJedMjere = artikl.jedinicamjere;
			$scope.inpUrKategorija = artikl.kategorija.sifra;
			$scope.inpUrID = artikl.id;
			$('#urediartikl').modal
			({
				show: true
			});
		}
		else if(naziv == "obrisi")
		{
			$scope.obrID = artikl;
			$('#obrisiartikl').modal
			({
				show: true
			});
		}
	};
	$scope.DodajNoviArtikl = function()
	{
		if($scope.inpNaziv == "" || $scope.inpNaziv == null)
		{
			$scope.Greska = "Niste upisali naziv artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpOpis == "" || $scope.inpOpis == null)
		{
			$scope.Greska = "Niste upisali opis artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpJedMjere == "" || $scope.inpJedMjere == null)
		{
			$scope.Greska = "Niste upisali jedinicu mjere!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpCijena == null)
		{
			$scope.Greska = "Niste upisali cijenu artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpKategorija == null)
		{
			$scope.Greska = "Niste izabrali kategoriju artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id': 'dodaj_artikl',
				'naziv': $scope.inpNaziv,
				'opis': $scope.inpOpis,
				'jedinicamjere': $scope.inpJedMjere,
				'jedinicnacijena': $scope.inpCijena,
				'kateg': $scope.inpKategorija.sifra
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiArtikle();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.Uredi = function()
	{
		if($scope.inpUrNaziv == "" || $scope.inpUrNaziv == null)
		{
			$scope.Greska = "Niste upisali naziv artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#urediartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrOpis == "" || $scope.inpUrOpis == null)
		{
			$scope.Greska = "Niste upisali opis artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#urediartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrJedMjere == "" || $scope.inpUrJedMjere == null)
		{
			$scope.Greska = "Niste upisali jedinicu mjere!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#urediartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrCijena == null)
		{
			$scope.Greska = "Niste upisali cijenu artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#urediartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrKategorija == null)
		{
			$scope.Greska = "Niste izabrali kategoriju artikla!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#urediartikl').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id':'uredi_artikl',
				'id': $scope.inpUrID,
				'naziv': $scope.inpUrNaziv,
				'opis': $scope.inpUrOpis,
				'jedinicamjere': $scope.inpUrJedMjere,
				'jedinicnacijena': $scope.inpUrCijena,
				'kateg': $scope.inpUrKategorija
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiArtikle();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.Obrisi = function()
	{
		var oData = {
			'action_id':'obrisi_artikl',
			'id': $scope.obrID
		};

	    $http.post('action.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
		    	$scope.DohvatiArtikle();
		    },
		    function (e) 
		    {
		    	console.log("Greska");
		 	}
		);
	};
});

oPocetnaModul.controller('kracunaController', function ($scope, $http, $location) {
	$http.post('action.php', {action_id: 'provjera_logina'})
    .then
    (
    	function (response) 
    	{
	    	if( response.data != 1 )
	    	{
	    		$location.path('/');
	    	} 
	    },
	    function (e) 
	    {
	    	console.log('error');
	 	}
	);
	$("#navigacija:nth-child(1)").removeClass( "active" );
	$("#navigacija:nth-child(3)").removeClass( "active" );
	$("#navigacija:nth-child(2)").addClass( "active" );
	$("#navigacija:nth-child(4)").removeClass( "active" );
	$scope.Kolicina = [];
	$scope.Cijena = 0;
	$scope.UkupnaCijena = 0;
	$scope.DohvatiArtikle = function()
	{
		$http({
	        method : "GET",
	        url:'json.php?json_id=dohvati_artikle'
	    }).then(function(response) {
	        $scope.oArtikli = response.data;
	    },function (response) {
	        console.log('Doslo je do pogreske');
	    });
	};
    $scope.DohvatiArtikle();
	$http({
        method : "GET",
        url:'json.php?json_id=dohvati_kategorije'
    }).then(function(response) {
        $scope.oKategorije = response.data;
    },function (response) {
        console.log('Doslo je do pogreske');
    });
    $scope.dajCijenu = function(artikl)
 	{
 		if($scope.Kolicina[artikl.id] == null)
 		{
 			$scope.Kolicina[artikl.id] = 0;
 		}
        $scope.Cijena = artikl.jedinicnacijena*$scope.Kolicina[artikl.id];
        return $scope.Cijena;
    };
    $scope.dajUkupno = function()
 	{
 		if($("tbody tr").first().attr('id') == "zadnji")
		{
			$("tbody tr").first().hide();
		}
		else
		{
			$("tbody tr").last().show();
		}
 		$scope.UkupnaCijena = 0;
 		$.each($scope.oArtikli, function( index ) {
		  	if($scope.Kolicina[$scope.oArtikli[index].id] > 0)
		  	{
		  		$scope.UkupnaCijena = $scope.UkupnaCijena+($scope.oArtikli[index].jedinicnacijena*$scope.Kolicina[$scope.oArtikli[index].id]);
		  	}
		});
        return $scope.UkupnaCijena;
    };
	$scope.fKategorije = function(artikl)
	{
		if($scope.izabranaKategorija != null)
		{
			if(artikl.kategorija.sifra == $scope.izabranaKategorija.sifra)
			{
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	};
	$scope.Izabrani = function(artikl)
	{
		if($scope.cIzabrani != null && $scope.cIzabrani == true)
		{
			if($scope.Kolicina[artikl.id] > 0)
			{
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	};
	$scope.NapraviRacun = function()
	{
		var arArtikli = [];
		var arKolicina = [];
		var Pomocna = 0;
		$.each($scope.oArtikli, function( index ) {
		  	if($scope.Kolicina[$scope.oArtikli[index].id] > 0)
		  	{
		  		arArtikli.push($scope.oArtikli[index]);
		  		arKolicina.push($scope.Kolicina[$scope.oArtikli[index].id]);
		  		Pomocna = 1;
		  	}
		});

		if(Pomocna == 1)
		{
			var oData = {
				'action_id':'napravi_racun',
				'iznos': $scope.UkupnaCijena
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	var oData = {
						'action_id':'dodaj_stavke',
						'idracuna': response.data,
						'artikli': arArtikli,
						'kolicina': arKolicina
					};

				    $http.post('action.php', oData)
				    .then
				    (
				    	function (response) 
		    			{
					    	$scope.Kolicina = [];
							$scope.DohvatiArtikle();
							$scope.cIzabrani = false;
							$scope.Poruka = "Racun uspjesno kreiran!";
							$('#obavijest').modal
							({
								show: true
							});
						},
						function (e) 
					    {
					    	console.log("Greska");
					 	}
				    );
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
		else
		{
			$scope.Poruka = "Niste izabrali niti jedan artikl!";
			$('#obavijest').modal
			({
				show: true
			});
		}
	};
});

oPocetnaModul.controller('pracunaController', function ($scope, $http, $location) {
	$http.post('action.php', {action_id: 'provjera_logina'})
    .then
    (
    	function (response) 
    	{
	    	if( response.data != 1 )
	    	{
	    		$location.path('/');
	    	}   
	    },
	    function (e) 
	    {
	    	$location.path('/');
	    	console.log('Greska');
	 	}
	);
	$("#navigacija:nth-child(1)").removeClass( "active" );
	$("#navigacija:nth-child(2)").removeClass( "active" );
	$("#navigacija:nth-child(3)").addClass( "active" );
	$("#navigacija:nth-child(4)").removeClass( "active" );
	$scope.Kolicina = [];
	$scope.ImeZaposlenika = [];
	$scope.Cijena = 0;
	$scope.UkupnaCijena = 0;
    $http({
        method : "GET",
        url:'json.php?json_id=dohvati_racune'
    }).then(function(response) {
        $scope.oRacuni = response.data;
    },function (response) {
        console.log('Doslo je do pogreske');
    });
	$http({
        method : "GET",
        url:'json.php?json_id=dohvati_zaposlenike'
    }).then(function(response) {
        $scope.oZaposlenici = response.data;
        $scope.dohvatiZaposlenika();
    },function (response) {
        console.log('Doslo je do pogreske');
    });
    $scope.dohvatiDatum = function(racun)
 	{
 		var oDatum = new Date(racun.datum);
        return oDatum;
    };
    $scope.dohvatiZaposlenika = function()
 	{
 		angular.forEach($scope.oZaposlenici, function(value, key) {
 			$scope.ImeZaposlenika[$scope.oZaposlenici[key].sifrazap] = $scope.oZaposlenici[key].ime+" "+$scope.oZaposlenici[key].prezime;
 		});
    };
	$scope.fZaposlenici = function(racun)
	{
		if($scope.izabranZaposlenik != null)
		{
			if(racun.sifrazaposlenika == $scope.izabranZaposlenik)
			{
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	};
	$scope.GetModal = function(naziv, stavke)
	{
		if(naziv == "prikazistavke")
		{
			$scope.PrikazStavki = stavke;
			$('#prikazistavke').modal
			({
				show: true
			});
		}
	};
});

oPocetnaModul.controller('adminController', function ($scope, $http, $location) {
	$http.post('action.php', {action_id: 'provjera_logina'})
    .then
    (
    	function (response) 
    	{
	    	if( response.data == 1 )
	    	{
	    		$("#odjava").show();
	    		$http.post('action.php', {action_id: 'provjera_pozicije'})
			    .then
			    (
			    	function (response) 
			    	{
				    	if( response.data != 1 )
				    	{
				    		$location.path('/naslovna');
				    	}   
				    },
				    function (e) 
				    {
				    	console.log('error');
				 	}
				);
	    	}
	    	else
	    	{
	    		$("#odjava").hide();
	    		$location.path('/');
	    	}
	        
	    },
	    function (e) 
	    {
	    	console.log('error');
	 	}
	);
	$scope.oZaposlenici = [];
	$scope.oKategorije = [];
	$scope.oPozicije = [];
	$scope.Greska = "";
	$("#navigacija:nth-child(1)").removeClass( "active" );
	$("#navigacija:nth-child(2)").removeClass( "active" );
	$("#navigacija:nth-child(3)").removeClass( "active" );
	$("#navigacija:nth-child(4)").addClass( "active" );
	$http({
        method : "GET",
        url:'json.php?json_id=dohvati_pozicije'
    }).then(function(response) {
        $scope.oPozicije = response.data;
    },function (response) {
        console.log('Doslo je do pogreske');
    });
    $scope.DohvatiKategorije = function()
	{
		$http({
	        method : "GET",
	        url:'json.php?json_id=dohvati_kategorije'
	    }).then(function(response) {
	        $scope.oKategorije = response.data;
	    },function (response) {
	        console.log('Doslo je do pogreske');
	    });
	};
	$scope.DohvatiKategorije();
	$scope.DohvatiZaposlenike = function()
	{
		$http({
	        method : "GET",
	        url:'json.php?json_id=dohvati_zaposlenike'
	    }).then(function(response) {
	        $scope.oZaposlenici = response.data;
	    },function (response) {
	        console.log('Doslo je do pogreske');
	    });
	};
    $scope.DohvatiZaposlenike();
    $scope.fRacunDeaktiviran = function(zap)
	{
		console.log(zap);
		if(zap.deaktiviran == 0 || zap.deaktiviran == "N/A")
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	$scope.fPozicije = function(zaposlenik)
	{
		if($scope.selectedPozicija != null)
		{
			if(zaposlenik.pozicija == $scope.selectedPozicija)
			{
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	};
	$scope.GetModal = function(naziv, podaci)
	{
		if($scope.Greska == "")
		{
			$("#greska").hide();
			$("#greska2").hide();
		}
		if(naziv == "dodaj")
		{
			$('#dodajzaposlenika').modal
			({
				show: true
			});
		}
		else if(naziv == "uredi")
		{
			$scope.inpUrIme = podaci.ime;
			$scope.inpUrPrezime = podaci.prezime;
			$scope.inpUrKorIme = podaci.username;
			$scope.inpUrSifra = podaci.sifra;
			$scope.inpUrPozicija = podaci.pozicija;
			$scope.inpUrID = podaci.sifrazap;
			$('#uredizaposlenika').modal
			({
				show: true
			});
		}
		else if(naziv == "obrisi")
		{
			$scope.obrID = podaci;
			$('#obrisizaposlenika').modal
			({
				show: true
			});
		}
		else if(naziv == "dodajkat")
		{
			$('#dodajkategoriju').modal
			({
				show: true
			});
		}
		else if(naziv == "uredikat")
		{
			$scope.inpUrKatNaziv = podaci.naziv;
			$scope.inpUrKatSifra = podaci.sifra;
			$('#uredikategoriju').modal
			({
				show: true
			});
		}
		else if(naziv == "obrisikat")
		{
			$scope.obrKatID = podaci;
			$('#obrisikategoriju').modal
			({
				show: true
			});
		}
	};
	$scope.DodajKategoriju = function()
	{
		if($scope.inpNazivKat == "" || $scope.inpNazivKat == null)
		{
			$scope.Greska = "Niste upisali naziv kategorije!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajkategoriju').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id': 'dodaj_kategoriju',
				'naziv': $scope.inpNazivKat,
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiKategorije();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.UrediKategoriju = function()
	{
		if($scope.inpUrKatNaziv == "" || $scope.inpUrKatNaziv == null)
		{
			$scope.Greska = "Niste upisali naziv kategorije!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredikategoriju').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id':'uredi_kategoriju',
				'sifra': $scope.inpUrKatSifra,
				'naziv': $scope.inpUrKatNaziv
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiKategorije();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.ObrisiKategoriju = function()
	{
		var oData = {
			'action_id':'obrisi_kategoriju',
			'sifra': $scope.obrKatID
		};
	    $http.post('action.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
		    	$scope.DohvatiKategorije();
		    },
		    function (e) 
		    {
		    	console.log("Greska");
		 	}
		);
	};
	$scope.DodajZaposlenika = function()
	{
		if($scope.inpIme == "" || $scope.inpIme == null)
		{
			$scope.Greska = "Niste upisali ime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajzaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpPrezime == "" || $scope.inpPrezime == null)
		{
			$scope.Greska = "Niste upisali prezime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajzaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpKorIme == "" || $scope.inpKorIme == null)
		{
			$scope.Greska = "Niste upisali korisnicko ime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajzaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpSifra == "" || $scope.inpSifra == null)
		{
			$scope.Greska = "Niste upisali sifru zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajzaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpPozicija == null)
		{
			$scope.Greska = "Niste izabrali poziciju zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska").show();
				$('#dodajzaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id': 'dodaj_zaposlenika',
				'ime': $scope.inpIme,
				'prezime': $scope.inpPrezime,
				'korime': $scope.inpKorIme,
				'sifra': $scope.inpSifra,
				'pozicija': $scope.inpPozicija
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiZaposlenike();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.UrediZaposlenika = function()
	{
		if($scope.inpUrIme == "" || $scope.inpUrIme == null)
		{
			$scope.Greska = "Niste upisali ime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredizaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrPrezime == "" || $scope.inpUrPrezime == null)
		{
			$scope.Greska = "Niste upisali prezime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredizaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrKorIme == "" || $scope.inpUrKorIme == null)
		{
			$scope.Greska = "Niste upisali korisnicko ime zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredizaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrSifra == "" || $scope.inpUrSifra == null)
		{
			$scope.Greska = "Niste upisali sifru zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredizaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else if($scope.inpUrPozicija == null)
		{
			$scope.Greska = "Niste izabrali poziciju zaposlenika!";
			setTimeout(function(){
				$scope.$apply();
				$("#greska2").show();
				$('#uredizaposlenika').modal
				({
					show: true
				});
			}, 100);
			setTimeout(function(){
				$("#greska2").fadeOut();
				$scope.Greska = "";
			}, 5000);
		}
		else
		{
			var oData = {
				'action_id':'uredi_zaposlenika',
				'sifra_zaposlenika': $scope.inpUrID,
				'ime': $scope.inpUrIme,
				'prezime': $scope.inpUrPrezime,
				'username': $scope.inpUrKorIme,
				'sifra': $scope.inpUrSifra,
				'pozicija': $scope.inpUrPozicija
			};

		    $http.post('action.php', oData)
		    .then
		    (
		    	function (response) 
		    	{
			    	$scope.DohvatiZaposlenike();
			    },
			    function (e) 
			    {
			    	console.log("Greska");
			 	}
			);
		}
	};
	$scope.ObrisiZaposlenika = function()
	{
		var oData = {
			'action_id':'obrisi_zaposlenika',
			'id': $scope.obrID
		};
	    $http.post('action.php', oData)
	    .then
	    (
	    	function (response) 
	    	{
		    	$scope.DohvatiZaposlenike();
		    },
		    function (e) 
		    {
		    	console.log("Greska");
		 	}
		);
	};
});