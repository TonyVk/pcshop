<?php
session_start();
include "connection.php";

$sPostData = file_get_contents("php://input");
$oPostData = json_decode($sPostData);

$sAction = $oPostData->action_id;

switch ($sAction)
{
	case 'provjera_pozicije':
		if(isset($_SESSION['pozicija']) )
		{
			echo $_SESSION['pozicija'];
		}
		else
		{
			echo 0;
		}
		break;
	case 'provjera_logina':
		if(isset($_SESSION['korisnik_id']) )
		{
			echo 1;
		}
		else
		{
			echo 0;
		}
		break;
	case 'login':
		$sUserName = $oPostData->username;
		$sPassword = $oPostData->sifra;

		$sQuery = "SELECT * FROM zaposlenici";
		$oRecord=$oConnection->query($sQuery);

		$Pomocna = 0;
		
		while($oRow=$oRecord->fetch(PDO::FETCH_BOTH))
		{
			if($oRow['username'] == $sUserName && $oRow['sifra'] == $sPassword)
			{
				$Pomocna = 1;
				$_SESSION['korisnik_id'] = $oRow['sifra_zaposlenika'];
				$_SESSION['pozicija'] = $oRow['pozicija'];
				echo 1;
			}
		}
		if($Pomocna == 0)
		{
			echo 0;
		}
		break;
	case 'logout':
		session_destroy();
		break;
	case 'napravi_racun':
		$sQuery = "INSERT INTO racuni (sifra_zaposlenika, iznos, datum) VALUES (:sifra_zap, :iznos, :datum)";

		$date = new DateTime("now", new DateTimeZone('Europe/Zagreb') );
		$datum = $date->format('Y-m-d H:i:s');

		$oData = array(
		 'sifra_zap' => $_SESSION['korisnik_id'],
		 'iznos' => $oPostData->iznos,
		 'datum' => $datum
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			$id = $oConnection->lastInsertId();
			echo $id;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'dodaj_stavke':
		$artikli = $oPostData->artikli;
		$kolicina = $oPostData->kolicina;
		foreach ($artikli as $key => $i) {
			$id = 0;
			$cijena = 0;
			$naziv = "N/A";
			$opis = "N/A";
			foreach ($i as $key2 => $j) {
				if($key2 == "id")
				{
					$id = $j;
				}
				else if($key2 == "jedinicnacijena")
				{
					$cijena = $j;
				}
				else if($key2 == "naziv")
				{
					$naziv = $j;
				}
				else if($key2 == "opis")
				{
					$opis = $j;
				}
			}
			$ukupno = $kolicina[$key]*$cijena;
			$sQuery = "INSERT INTO stavke (id_racuna, id_artikla, naziv, opis, kolicina, ukupna_cijena) VALUES (:idrac, :idart, :naz, :op, :kol, :cij)";

			$oData = array(
			 'idrac' => $oPostData->idracuna,
			 'idart' => $id,
			 'naz' => $naziv,
			 'op' => $opis,
			 'kol' => $kolicina[$key],
			 'cij' => $ukupno
			);
			try
			{
				$oStatement=$oConnection->prepare($sQuery);
				$oStatement->execute($oData);
				echo 1;
			}
			catch(PDOException $error)
			{
				echo $error;
				echo 0;
			}
		}
		break;
	case 'dodaj_kategoriju':
		$sQuery = "INSERT INTO kategorije (Naziv) VALUES (:naz)";

		$oData = array(
		 'naz' => $oPostData->naziv
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'uredi_kategoriju':
		$sQuery = "UPDATE kategorije SET Naziv = :naz WHERE Sifra = :id";

		$oData = array(
		 'id' => $oPostData->sifra,
		 'naz' => $oPostData->naziv,
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'obrisi_kategoriju':
		$sQuery = "DELETE FROM kategorije WHERE Sifra = :id";

		$oData = array(
		 'id' =>$oPostData->sifra
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		$sQuery = "DELETE FROM artikli WHERE Kategorija = :id";

		$oData = array(
		 'id' =>$oPostData->sifra
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'dodaj_zaposlenika':
		$sQuery = "INSERT INTO zaposlenici (ime, prezime, username, sifra, pozicija) VALUES (:ime, :prez, :korime, :sifra, :poz)";

		$oData = array(
		 'ime' => $oPostData->ime,
		 'prez' => $oPostData->prezime,
		 'korime' => $oPostData->korime,
		 'sifra' => $oPostData->sifra,
		 'poz' => $oPostData->pozicija
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'uredi_zaposlenika':
		$sQuery = "UPDATE zaposlenici SET ime = :ime, prezime = :prez, username = :korime, sifra = :sifra, pozicija = :poz WHERE sifra_zaposlenika = :id";

		$oData = array(
		 'id' => $oPostData->sifra_zaposlenika,
		 'ime' => $oPostData->ime,
		 'prez' => $oPostData->prezime,
		 'korime' => $oPostData->username,
		 'sifra' => $oPostData->sifra,
		 'poz' => $oPostData->pozicija
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'obrisi_zaposlenika':
		$sQuery = "UPDATE zaposlenici SET deaktiviran = 1 WHERE sifra_zaposlenika = :id";

		$oData = array(
		 'id' =>$oPostData->id
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'dodaj_artikl':
		$sQuery = "INSERT INTO artikli (Naziv, Opis, JedinicaMjere, JedinicnaCijena, Kategorija) VALUES (:naz, :op, :jedmj, :cij, :kateg)";

		$oData = array(
		 'naz' => $oPostData->naziv,
		 'op' => $oPostData->opis,
		 'jedmj' => $oPostData->jedinicamjere,
		 'cij' => $oPostData->jedinicnacijena,
		 'kateg' => $oPostData->kateg
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'obrisi_artikl':
		$sQuery = "DELETE FROM artikli WHERE ID = :id";

		$oData = array(
		 'id' =>$oPostData->id
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	case 'uredi_artikl':
		$sQuery = "UPDATE artikli SET Naziv = :naz, Opis = :op, JedinicaMjere = :jedmj, JedinicnaCijena = :cij, Kategorija = :kateg WHERE ID = :id";

		$oData = array(
		 'id' => $oPostData->id,
		 'naz' => $oPostData->naziv,
		 'op' => $oPostData->opis,
		 'jedmj' => $oPostData->jedinicamjere,
		 'cij' => $oPostData->jedinicnacijena,
		 'kateg' => $oPostData->kateg
		);
		try
		{
			$oStatement=$oConnection->prepare($sQuery);
			$oStatement->execute($oData);
			echo 1;
		}
		catch(PDOException $error)
		{
			echo $error;
			echo 0;
		}
		break;
	default:
       header("Location:index.php");
}
?>