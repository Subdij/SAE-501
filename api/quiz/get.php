<?php

require_once("../class/Database.php");
require_once("../class/Quiz.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods: GET");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin:*");
    exit;
}

$request_method = $_SERVER['REQUEST_METHOD'];
if ($request_method !== "GET") {
    header("HTTP/1.0 405 Method Not Allowed");
    exit;
}

$request_uri = $_SERVER['REQUEST_URI'];
$request_headers = getallheaders();
$request_body = file_get_contents('php://input');

if (isset($_GET["mail"])){
    $database = new Database();
    $bdd = $database->getConnection();
    $quiz = new Quiz($bdd, $_GET["mail"], "", "", "", "", "", "", "", "", "", "");
    $quiz = $quiz->getQuiz();
    if ($quiz){
        header("HTTP/1.0 200 OK");
        echo json_encode($quiz[0]);
        exit;
    }
    else{
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Le quiz n'a pas pu être récupéré"]);
        exit;
    }
}

?>