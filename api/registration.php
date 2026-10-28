<?php
require_once("class/Database.php");
require_once("class/User.php");
require_once("class/Contact.php");
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
if (isset($data["mail"]) && isset($data["lastName"]) && isset($data["firstName"]) && isset($data["phone"]) && isset($data["password"])) {
    $user = new User($bdd);
    $user->setAll($data["mail"], $data["lastName"], $data["firstName"], $data["phone"], $data["password"], "visitor", $user->generateToken());
    $users = $user->selectUser();
    $contact = new Contact($bdd);
    $contact->setAllExceptId($user->getMail(), $user->getLastName(), $user->getFirstName(), $user->getPhone());
    $contacts = $contact->selectContact();
    if ($user->isValid($users) && $contact->isValid($contacts)){
        $user->createUser();
        $contact->createContact();
        header("HTTP/1.0 201 Created", true, 201);
        $response = [];
        $response['token'] = $user->getToken();
        $response['first_name'] = $user->getFirstName();
        $response['status'] = $user->getStatus();
        $response['mail'] = $user->getMail();
        echo json_encode($response);
        return json_encode($response);
    }
    else{
        header("HTTP/1.0 400 Bad Request");
        echo json_encode($user->getErrors($users));
        return json_encode($user->getErrors($users));
    }
} else {
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>