<?php
try {
    $connect = new PDO("mysql:host=localhost;port=3306;dbname=chat;","root","");
} catch (Exception $ex) {
    throw $ex;
}

$task="list";
if(array_key_exists("task",$_GET)){
    $task = $_GET['task'];
}
if($task=="write"){
    postMessage();
}else{
    getMessage();
}
function getMessage(){
    global $connect;
    $resultats = $connect -> query("Select * from users order by id ");

    $message = $resultats -> fetchAll();
    echo  json_encode($message);
}
function postMessage(){
    global $connect;
    if(!array_key_exists('auteur',$_POST) || !array_key_exists('content',$_POST)){
        echo json_encode(["status"=>"error","message"=>"une donnees ou plusieurs sont manquante"]);
        return;
    }
    $auteur = $_POST['auteur'];
    $content = $_POST['content'];

    $query = $connect -> prepare('INSERT INTO users (pseudo,content) VALUES (?,?)');
    $query -> execute([$auteur,$content]);
    echo json_encode(["status"=>"success"]);
}
