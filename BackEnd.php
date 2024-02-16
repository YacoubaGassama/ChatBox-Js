<?php
// accepter toutes requêtes
header("Access-Control-Allow-Origin: *" );
header("Access-Control-Allow-Headers: *" );
header('Access-Control-Allow-Credentials: true' );
header("Access-Control-Allow-Methods: *" );
// connexion de la base de données
$reponse = array();
$connexion = new PDO("mysql:host=localhost;port=3306;dbname=chat;" ,"root","");
// récupération des données à partir de la base de données
$pseudo = $_POST['pseudo'];
$message = $_POST['message'];
try {
    $results = $connexion->exec("insert into users(pseudo,message) values('$pseudo','$message')" );
if ($results) {
    $reponse['status'] = true;
}
} catch (\Throwable $th) {
    throw $th;
}
$user= $connexion->query("select * from users where id="+$results['id'] )
 ->fetchAll(PDO::FETCH_ASSOC);
//Envoyer la réponse sous format JSON
echo json_encode($user);
?>