<?php
require_once("class/Database.php");
require_once("class/User.php");
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
if (isset($data["mail"]) && isset($data["password"])) {
    $user->setMail($data['mail']);
    $logInUser = $user->selectUser();
    if (count($logInUser) === 1) {
        $user->setLastName($logInUser[0]['last_name']);
        $user->setFirstName($logInUser[0]['first_name']);
        $user->setPassword($data["password"]);
        $user->setStatus($logInUser[0]['status']);
        if($user->isValidPassword($logInUser[0]['password'])) {
            $token = $user->generateToken();
            $user->setToken($token);
            $user->updateToken();
            $response = [];
            $response['token'] = $user->getToken();
            $response['first_name'] = $user->getFirstName();
            $response['status'] = $user->getStatus();
            $response['mail'] = $user->getMail();
            header("HTTP/1.0 200 OK");
            echo(json_encode($response));
            return json_encode($response);   
            exit;
        } else {
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["Le mot de passe est invalide"]);
            return json_encode(["Le mot de passe est invalide"]);
            exit;       
        }
    } else {
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["Le mot de passe est invalide"]);
        return json_encode(["Le mot de passe est invalide"]);
        exit;
    }
} else {
    echo json_encode(["Champs manquants"]);
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>