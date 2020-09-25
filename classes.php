<?php

class Configuration
{
	public $host="localhost";
	public $dbName="pcshop";
	public $username="root";
	public $password="";	
}

class Osoba
{
	public $ime = "N/A";
	public $prezime = "N/A";
}

class Zaposlenik extends Osoba
{
	public $sifrazap = "N/A";
	public $username = "N/A";
	public $sifra = "N/A";
	public $pozicija = "N/A";
	public $deaktiviran = "N/A";

	public function __construct($sifraz=null,$im=null,$prez=null,$usern=null,$sifra=null,$poz=null,$deakt=null)
	{
		if($sifraz) $this->sifrazap=$sifraz;
		if($im) $this->ime=$im;
		if($prez) $this->prezime=$prez;
		if($usern) $this->username=$usern;
		if($sifra) $this->sifra=$sifra;
		if($poz) $this->pozicija=$poz;
		if($deakt) $this->deaktiviran=$deakt;
	}
}

class Pozicija
{
	public $id="N/A";
	public $ime="N/A";

	public function __construct($id=null,$ime=null)
	{
		if($id) $this->id=$id;
		if($ime) $this->ime=$ime;
	}
}

class Artikl
{
	public $id="N/A";
	public $naziv="N/A";
	public $opis="N/A";
	public $jedinicamjere="N/A";
	public $jedinicnacijena="N/A";
	public $kategorija="N/A";

	public function __construct($id=null,$naz=null,$op=null,$jedmj=null,$jedincijena=null,$kat=null)
	{
		if($id) $this->id=$id;
		if($naz) $this->naziv=$naz;
		if($op) $this->opis=$op;
		if($jedmj) $this->jedinicamjere=$jedmj;
		if($jedincijena) $this->jedinicnacijena=$jedincijena;
		if($kat) $this->kategorija=$kat;
	}
}

class Stavka extends Artikl
{
	public $kolicina="N/A";
	public $ukupna_cijena="N/A";

	public function __construct($sifraart=null,$naz=null,$op=null,$kol=null,$ukcij=null)
	{
		if($sifraart) $this->id=$sifraart;
		if($naz) $this->naziv=$naz;
		if($op) $this->opis=$op;
		if($kol) $this->kolicina=$kol;
		if($ukcij) $this->ukupna_cijena=$ukcij;
	}
}

class Racun
{
	public $sifraracuna="N/A";
	public $sifrazaposlenika="N/A";
	public $uiznos="N/A";
	public $datum="N/A";
	public $stavke="N/A";

	public function __construct($sifr=null,$sifz=null,$uiznos=null,$datum=null,$stav=nil)
	{
		if($sifr) $this->sifraracuna=$sifr;
		if($sifz) $this->sifrazaposlenika=$sifz;
		if($uiznos) $this->uiznos=$uiznos;
		if($datum) $this->datum=$datum;
		if($stav) $this->stavke=$stav;
	}
}

class Kategorija
{
	public $sifra="N/A";
	public $naziv="N/A";

	public function __construct($sif=null,$naz=null)
	{
		if($sif) $this->sifra=$sif;
		if($naz) $this->naziv=$naz;
	}
}
?>