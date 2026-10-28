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
try{
    $data = json_decode($request_body, true);
}catch(Exception $e){
    header("HTTP/1.0 400 Bad Request");
    exit;
}
$database = new Database();
$bdd = $database->getConnection();
$contact = new Contact($bdd);
$contacts = $contact->selectAllContacts();
header("HTTP/1.0 200 OK");
echo(json_encode($contacts));
return json_encode($contacts);
exit();
?>