<?php
//Ce fichier est requis par api/class/Quiz.php afin de s'assurer que les réponses envoyées par l'utilisateur sont bien dans la liste des réponses possibles

$answersTransportType = ["pied", "velo_trotinette", "train", "voiture", "bus"];
define("ANSWERS_TRANSPORT_TYPE", $answersTransportType);
$answersTransportTime = ["<30", "30-45", "45-90", ">90"];
define("ANSWERS_TRANSPORT_TIME", $answersTransportTime);
$answersDecouverte = ["bouche_a_oreille", "affiches", "reseaux_sociaux", "recherches_personnelles", "autre"];
define("ANSWERS_DECOUVERTE", $answersDecouverte);
$answersBac = ["general", "technologique", "professionnel"];
define("ANSWERS_BAC", $answersBac);
$answersFavoriteDomain = ["developpement_web", "creation_jeux_video", "design", "graphisme", "audiovisuel"];
define("ANSWERS_FAVORITE_DOMAIN", $answersFavoriteDomain);

?>