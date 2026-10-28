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

$database = new Database();
$bdd = $database->getConnection();
if(isset($_POST["id"]) && isset($_POST["title"]) && isset($_POST["description"]) && isset($_POST["link"]) && isset($_POST["author"]) && isset($_POST["study_year"]) && isset($_POST["date"])){
    $project = new Project($bdd);
    $project->setId($_POST["id"]);
    $project->setTitle($_POST["title"]);
    $project->setDescription($_POST["description"]);
    $project->setLink($_POST["link"]);
    $project->setAuthor($_POST["author"]);
    $project->setStudyYear($_POST["study_year"]);
    $project->setDate($_POST["date"]);
    if(isset($_FILES["image"])){
        $project->setImage($_FILES["image"]);
    }
    else{
        $project->setImage(null);
    }
    if(!$project->validateData() || !$project->validateImage()){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Les données ne sont pas valides", "validateData"=>!$project->validateData(), "validateImage"=>!$project->validateImage()]);
        exit;
    }else{
        if ($project->editProject()){
            header("HTTP/1.0 200 OK", true, 201);
            exit();
        }
        else{
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["error"=>"Le projet n'a pas pu être modifié"]);
            exit;
        }
    }
}else{
    if(!isset($_POST["id"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre id"]);
        exit;
    }
    if(!isset($_POST["title"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre title"]);
        exit;
    }
    if(!isset($_POST["description"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre description"]);
        exit;
    }
    if(!isset($_POST["link"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre link"]);
        exit;
    }
    if(!isset($_POST["author"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre author"]);
        exit;
    }
    if(!isset($_POST["study_year"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre study_year"]);
        exit;
    }
    if(!isset($_POST["date"])){
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["error"=>"Il manque le paramètre date"]);
        exit;
    }
    header("HTTP/1.0 400 Bad Request");
    echo json_encode(["error"=>"Il manque des paramètres"]);
    exit;
}
?>
