<?php

require_once("../class/Database.php");
require_once("../class/Project.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Origin:*");
    exit;
}

$database = new Database();
$bdd = $database->getConnection();
$project = new Project($bdd);
$result = $project->getAllProjects();
if (count($result) > 0){
    header("HTTP/1.0 200 OK", true, 200);
    echo json_encode($result);
    exit();
}else{
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(["error"=>"Pas de projet trouvé"]);
    exit;
}
?>
