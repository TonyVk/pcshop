<?php
ini_set('memory_limit', '2048M');
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
include "connection.php";

$sJsonID="";
$oJson=array();

if(isset($_GET['json_id']))
{
	$sJsonID=$_GET['json_id'];
}
else
{
	header("Location:index.php");
}

switch($sJsonID)
{
	case 'dohvati_artikle':
		$sQuery = "SELECT ID, Naziv, Opis, JedinicaMjere, JedinicnaCijena, Kategorija FROM artikli";
		$oRecord=$oConnection->query($sQuery);
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$sQuery2 = "SELECT * FROM kategorije WHERE Sifra = ".$oRow['Kategorija'];
			$oRecord2=$oConnection->query($sQuery2);
			while($oRow2=$oRecord2->fetch(PDO::FETCH_BOTH))
			{
				$oKategorija=new Kategorija(
					$oRow2['Sifra'],
					$oRow2['Naziv']
				);
				$oArtikl=new Artikl(
					$oRow['ID'],
					$oRow['Naziv'],
					$oRow['Opis'],
					$oRow['JedinicaMjere'],
					$oRow['JedinicnaCijena'],
					$oKategorija
				);
				array_push($oJson,$oArtikl);
			}
		}
		echo json_encode($oJson);
		break;
	case 'dohvati_racune':
		$sQuery = "SELECT * FROM racuni";
		$oRecord=$oConnection->query($sQuery);
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$Stavke=array();
			$sQuery2 = "SELECT * FROM stavke";
			$oRecord2=$oConnection->query($sQuery2);
				
			while($oRow2=$oRecord2->fetch(PDO::FETCH_BOTH))
			{
				if($oRow['sifra'] == $oRow2['id_racuna'])
				{
					$oStavka=new Stavka(
						$oRow2['id_artikla'],
						$oRow2['naziv'],
						$oRow2['opis'],
						$oRow2['kolicina'],
						$oRow2['ukupna_cijena'],
					);
					array_push($Stavke,$oStavka);
				}
			}
			$oRacun=new Racun(
				$oRow['sifra'],
				$oRow['sifra_zaposlenika'],
				$oRow['iznos'],
				$oRow['datum'],
				$Stavke
			);
			array_push($oJson,$oRacun);
		}
		echo json_encode($oJson);
		break;
	case 'dohvati_zaposlenike':
		$sQuery = "SELECT * FROM zaposlenici";
		$oRecord=$oConnection->query($sQuery);
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oZaposlenik=new Zaposlenik(
				$oRow['sifra_zaposlenika'],
				$oRow['ime'],
				$oRow['prezime'],
				$oRow['username'],
				$oRow['sifra'],
				$oRow['pozicija'],
				$oRow['deaktiviran']
			);
			array_push($oJson,$oZaposlenik);
		}
		echo json_encode($oJson);
		break;
	case 'dohvati_pozicije':
		$sQuery = "SELECT * FROM pozicije";
		$oRecord=$oConnection->query($sQuery);
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oPozicija=new Pozicija(
				$oRow['ID'],
				$oRow['Ime']
			);
			array_push($oJson,$oPozicija);
		}
		echo json_encode($oJson);
		break;
	case 'dohvati_kategorije':
		$sQuery = "SELECT * FROM kategorije";
		$oRecord=$oConnection->query($sQuery);
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			$oKategorija=new Kategorija(
				$oRow['Sifra'],
				$oRow['Naziv']
			);
			array_push($oJson,$oKategorija);
		}
		echo json_encode($oJson);
		break;
}
?>