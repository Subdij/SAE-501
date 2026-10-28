<?php
require_once("../class/Database.php");
require_once("../class/Parcours.php");
require_once("../class/User.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin:*");
    exit;
}

$request_method = $_SERVER['REQUEST_METHOD'];
if ($request_method !== "POST") {
    header("HTTP/1.0 405 Method Not Allowed");
    exit;
}
$request_uri = $_SERVER['REQUEST_URI'];
$request_headers = getallheaders();
$request_body = file_get_contents('php://input');
try{
    $data = json_decode($request_body, true);
}catch(Exception $e){
    header("HTTP/1.0 400 Bad Request");
    exit;
}
$database = new Database();
$bdd = $database->getConnection();
$user = new User($bdd);
if (isset($data["user"])) {
    $parcours = new Parcours($bdd);
    $parcours->setUser($data["user"]);
    $parcoursSelected = $parcours->getParcours();
    $user->setMail($data["user"]);
    $userToVerif = $user->selectUser();
    if (isset($data["133"])){
        $salle133 = $data["133"];
    } else {
        $salle133 = null;
    }
    if (isset($data["212"])){
        $salle212 = $data["212"];
    } else {
        $salle212 = null;
    }
    if (isset($data["311"])){
        $salle311 = $data["311"];
    } else {
        $salle311 = null;
    }
    if (isset($data["317"])){
        $salle317 = $data["317"];
    } else {
        $salle317 = null;
    }
    if (isset($data["studio"])){
        $studio = $data["studio"];
    } else {
        $studio = null;
    }
    $parcours->setAll($data["user"], $salle133, $salle212, $salle311, $salle317, $studio);
    if($parcours->isUserValid($userToVerif) && $parcours->isSalleValid()){
        $parcours->updateParcours();
        $salles = [];
        $salles['133'] = $salle133;
        $salles['212'] = $salle212;
        $salles['311'] = $salle311;
        $salles['317'] = $salle317;
        $salles['studio'] = $studio;
        echo json_encode($salles);
        header("HTTP/1.0 200 OK");
        exit;
    } else {
        return json_encode($parcours->getErrors($userToVerif));
    }
} else {
    return json_encode(["Champs manquants"]);
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>