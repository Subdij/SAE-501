<?php
require_once("../class/Database.php");
require_once("../class/Contact.php");
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
if (isset($data["id"]) && isset($data["email"]) && isset($data["lastName"]) && isset($data["firstName"]) && isset($data["phoneNumber"])) {
    $contact = new Contact($bdd);
    $contact->setAll($data["id"], $data["email"], $data["lastName"], $data["firstName"], $data["phoneNumber"]);
    $contacts = $contact->selectAllContacts();
    if ($contact->isValidId($contacts)) {
        $contactToUpdate = $contact->selectContact();
        if ($contact->isValid($contacts) || ($contact->getMail() == $contactToUpdate[0]['mail'] && $contact->isValidPhone())){
            $contact->updateContact();
            header("HTTP/1.0 200 OK");
            echo json_encode(["message" => "contact modifié"]);
            exit();
        }
        else{
            header("HTTP/1.0 400 Bad Request");
            echo json_encode($contact->getErrors($contactToUpdate));
            return json_encode($contact->getErrors($contactToUpdate));
        }
    } else {
        header("HTTP/1.0 400 Bad Request");
        $errors = ["L'id n'existe pas"];
        echo json_encode($errors);
        return json_encode($errors);
    }
} else {
    echo json_encode(["error" => "manque des champs"]);
    header("HTTP/1.0 400 Bad Request");
    exit;
}
?>