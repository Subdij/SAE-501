<?php
class Parcours{
    private $user;
    private $s133;
    private $s212;
    private $s311;
    private $s317;
    private $studio;
    private $bdd;

    public function __construct($bdd){
        $this->bdd = $bdd;
    }

    //GETTERS
    public function getUser(){
        return $this->user;
    }
    public function get133(){
        return $this->s133;
    }
    public function get212(){
        return $this->s212;
    }
    public function get311(){
        return $this->s311;
    }
    public function get317(){
        return $this->s317;
    }
    public function getStudio(){
        return $this->studio;
    }

    //SETTERS
    public function setUser($user){
        $this->user = $user;
    }
    public function set133($s133){
        $this->s133 = $s133;
    }
    public function set212($s212){
        $this->s212 = $s212;
    }
    public function set311($s311){
        $this->s311 = $s311;
    }
    public function set317($s317){
        $this->s317 = $s317;
    }
    public function setStudio($studio){
        $this->studio = $studio;
    }
    public function setAll($user, $s133, $s212, $s311, $s317, $studio){
        $this->user = $user;
        $this->s133 = $s133;
        $this->s212 = $s212;
        $this->s311 = $s311;
        $this->s317 = $s317;
        $this->studio = $studio;
    }

    //VERIF
    public function isSalleValid(){
        $salles = [$this->s133, $this->s212, $this->s311, $this->s317, $this->studio];
        $sallesNotNull = array_filter($salles, function ($salle){
            return $salle !== null;
        });
        $sallesNewArray = [];
        foreach($sallesNotNull as $salle){
            $sallesNewArray[] = $salle;
        }
        for ($i = 0; $i < count($sallesNewArray) - 1; $i++) {
            for ($j = $i + 1; $j < count($sallesNewArray); $j++) {
              if ($sallesNewArray[$i] === $sallesNewArray[$j]) {
                return false;
              }
            }
        }
        return true;
    }
    public function isUserValid($users){
        $isValidUser = false;
        if(count($users)==1){
            $isValidUser = true;
        }
        return $isValidUser;
    }
    public function getErrors($users){
        $errors = [];
        if(!$this->isSalleValid()){
            $errors[] = "Deux salles ne peuvent pas avoir la même position";
        }
        if (!$this->isUserValid($users)){
            $errors[] = "L'utilisateur n'est pas valide";
        }
        return $errors;
    }

    //MANIP BDD
    public function createParcours(){
        $queryCreate = "INSERT INTO parcours(user, salle_133, salle_212, salle_311, salle_317, studio) VALUES(:user, :salle_133, :salle_212, :salle_311, :salle_317, :studio)";
        $createParcours = $this->bdd -> prepare($queryCreate);
        $createParcours -> execute([
            ":user" => $this->user,
            ":salle_133" => $this->s133,
            ":salle_212" => $this->s212,
            ":salle_311" => $this->s311,
            ":salle_317" => $this->s317,
            ":studio" => $this->studio
        ]);
    }

    public function getParcours(){
        $querySelect = "SELECT * FROM parcours WHERE user=:user";
        $selectParcours = $this->bdd -> prepare($querySelect);
        $selectParcours -> execute([
            ":user" => $this->user
        ]);
        $parcours = $selectParcours -> fetchAll(PDO::FETCH_ASSOC);
        return $parcours;
    }

    public function getAllParcours(){
        $querySelect = "SELECT * FROM parcours";
        $selectParcours = $this->bdd -> prepare($querySelect);
        $selectParcours -> execute();
        $parcours = $selectParcours -> fetchAll(PDO::FETCH_ASSOC);
        return $parcours;
    }

    public function deleteParcours(){
        $queryDelete = "DELETE FROM parcours WHERE user=:user";
        $deleteParcours = $this->bdd -> prepare($queryDelete);
        $deleteParcours -> execute([
            ":user" => $this->user
        ]);
    }

    public function updateParcours(){
        $queryUpdate = "UPDATE parcours SET salle_133=:s133, salle_212=:s212, salle_311=:s311, salle_317=:s317, studio=:studio WHERE user=:user";
        $updateParcours = $this->bdd -> prepare($queryUpdate);
        $updateParcours -> execute([
            ":user" => $this->user,
            ":s133" => $this->s133,
            ":s212" => $this->s212,
            ":s311" => $this->s311,
            ":s317" => $this->s317,
            ":studio" => $this->studio
        ]);
    }

}
?>