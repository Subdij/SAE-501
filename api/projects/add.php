<?php

require_once("../class/Database.php");
require_once("../class/Project.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
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

$database = new Database();
$bdd = $database->getConnection();
if(isset($_POST["title"]) && isset($_POST["description"]) && isset($_POST["link"]) && isset($_POST["author"]) && isset($_POST["study_year"]) && isset($_POST["date"]) && isset($_FILES["image"])){
    $project = new Project($bdd);
    $project->setTitle($_POST["title"]);
    $project->setDescription($_POST["description"]);
    $project->setLink($_POST["link"]);
    $project->setAuthor($_POST["author"]);
    $project->setStudyYear($_POST["study_year"]);
    $project->setDate($_POST["date"]);
    $project->setImage($_FILES["image"]);
    if(!$project->validateData()){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Les données ne sont pas valides"]);
        exit;
    }else{
        if ($project->pushProject()){
            header("HTTP/1.0 201 Created", true, 201);
            exit();
        }
        else{
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["error"=>"Le projet n'a pas pu être ajouté"]);
            exit;
        }
    }
}else{
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(["error"=>"Il manque des paramètres"]);
    exit;
}
?>