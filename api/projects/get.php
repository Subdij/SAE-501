<?php

require_once("../class/Database.php");
require_once("../class/Project.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
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
    exit;
}

$database = new Database();
$bdd = $database->getConnection();
if(isset($data["id"])){
    $project = new Project($bdd);
    $project->setId($data["id"]);
    $result = $project->getProject();
    if (count($result) > 0){
        header("HTTP/1.0 200 OK", true, 200);
        echo json_encode($result);
        exit();
    }
    else{
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Pas de projet trouvé"]);
        exit;
    }
}else{
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(["error"=>"Il manque le paramètre id"]);
    exit;
}
?>
