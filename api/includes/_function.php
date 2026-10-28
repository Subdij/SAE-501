<?php
    require_once("includes/_connect_bdd.php");

    function editToken($mail, $token){
        $requestEditToken = "UPDATE users SET token=:token WHERE mail=:mail";
        $editToken = $bdd -> prepare($requestEditToken);
        $editToken -> execute([
            ":token"=> $token,
            ":mail"=>$mail
        ]);
    }
?>