<?php

require_once("../class/Database.php");
require_once("../class/Stats.php");
require_once("../includes/_allowed_answers.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:application/json");
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
$database = new Database();
$bdd = $database->getConnection();
// if (isset($_GET["age"]) || isset($_GET["satisfaction"]) || isset($_GET["transport_time"])){
// switch

if (isset($_GET["type"])){
    $stats = new Stats($bdd);
    switch($_GET["type"]){
        case "age":
            echo json_encode($stats->getStatsAge());
            break;
        case "bac":
            echo json_encode($stats->getStatsBac());
            break;
        case "satisfaction":
            echo json_encode($stats->getStatsSatisfaction());
            break;
        case "transport_time":
            echo json_encode($stats->getStatsTransportTime());
            break;
        case "transport_type":
            echo json_encode($stats->getStatsTransportType());
            break;
        case "favorite_domain":
            echo json_encode($stats->getStatsFavoriteDomain());
            break;
        case "decouverte":
            echo json_encode($stats->getStatsDecouverte());
            break;
        case "total":
            echo json_encode($stats->getStatsTotal());
            break;
        default:
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(array("error"=>"Le type de statistique demandé n'existe pas"));
            exit;
        }
        header("HTTP/1.0 200 OK");
        exit;
}else{
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(array("error"=>"Il manque le paramètre"));
    exit;
}
?>