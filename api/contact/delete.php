<?php
require_once("../class/Database.php");
require_once("../class/Contact.php");
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
$database = new Database();
$bdd = $database->getConnection();
if (isset($_GET["id"])) {
    $contact = new Contact($bdd);
    $contact->setId($_GET["id"]);
    $contacts = $contact->selectAllContacts();
    if($contact->isValidId($contacts)){
        $contact->deleteContact();
        header("HTTP/1.0 200 OK");
        exit;    
    } else{
        $errors = ["L'id n'existe pas"];
        return json_encode($errors);
        header("HTTP/1.0 400 Bad Request");
        exit;    
    }
} else {
    $errors = ["mail manquant"];
    return json_encode($errors);
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>