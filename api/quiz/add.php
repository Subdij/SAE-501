<?php

require_once("../class/Database.php");
require_once("../class/Quiz.php");
require_once("../includes/_allowed_answers.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:application/json");
header("Access-Control-Allow-Methods: POST");
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
    echo "Le JSON est invalide";
    exit;
}
$database = new Database();
$bdd = $database->getConnection();
if (isset($data["mail"]) && 
isset($data["transport_type"]) && 
isset($data["transport_time"]) && 
isset($data["decouverte"]) && 
isset($data["bac"]) && 
isset($data["favorite_domain"]) && 
isset($data["age"]) && 
isset($data["satisfaction"]) &&
isset($data["schools"]) && 
isset($data["code_postal"]) &&
isset($data["etablissement"])){

    $quiz = new Quiz($bdd, $data["mail"], $data["transport_type"], $data["transport_time"], $data["decouverte"], $data["bac"], $data["favorite_domain"], $data["age"], $data["satisfaction"], $data["schools"], $data["code_postal"], $data["etablissement"]);
    if (!$quiz->CheckAnswers()){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Les réponses ne sont pas valides"]);
        exit;
    }
    if ($quiz->pushQuiz()){
        header("HTTP/1.0 201 Created", true, 201);
        exit();
    }
    else{
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Le quiz n'a pas pu être ajouté, probablement car l'utilisateur n'existe pas"]);
        exit;
    }
}else{
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(["error"=>"Il manque des paramètres"]);
    exit;
}
?>