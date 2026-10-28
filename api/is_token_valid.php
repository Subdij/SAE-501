<?php
require_once("class/Database.php");
require_once("class/User.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
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
$data = json_decode($request_body, true);
$database = new Database();
$bdd = $database->getConnection();
if (isset($_GET['mail']) && isset($_GET['token'])) {
    $user = new User($bdd);
    $user->setMail($_GET['mail']);
    $logInUser = $user->selectUser();
    if(count($logInUser) < 1){
        $response = ["Utilisateur introuvable"];
        header("HTTP/1.0 400 Bad Request");
        echo json_encode($response);
        return json_encode($response);
    }
    $user->setAll($logInUser[0]["mail"], $logInUser[0]["last_name"], $logInUser[0]["first_name"],$logInUser[0]["phone"], $logInUser[0]["password"], $logInUser[0]["status"], $logInUser[0]["token"]);
    if($user->isValidToken($_GET['token'])) {
        $response = array(
            "token" => true
        );
        echo json_encode($response);
        return $response;
        header("HTTP/1.0 200 OK");
    } else {
        $response = array(
            "token" => false
        );
        echo json_encode($response);
        return $response;
        header("HTTP/1.0 200 OK");
    }
} else {
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>