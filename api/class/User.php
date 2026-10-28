<?php
class User{
    private $mail;
    private $lastName;
    private $firstName;
    private $phone;
    private $password;
    private $status;
    private $token;
    private $bdd;

    public function __construct($bdd){
        $this->bdd = $bdd;
    }

    //GETTERS
    public function getMail(){
        return $this->mail;
    }
    public function getLastName(){
        return $this->lastName;
    }
    public function getFirstName(){
        return $this->firstName;
    }
    public function getPhone(){
        return $this->phone;
    }
    public function getPassword(){
        return $this->password;
    }
    public function getStatus(){
        return $this->status;
    }
    public function getToken(){
        return $this->token;
    }

    //SETTERS
    public function setMail($mail){
        $this->mail = $mail;
    }
    public function setLastName($lastName){
        $this->lastName = $lastName;
    }
    public function setFirstName($firstName){
        $this->firstName = $firstName;
    }
    public function setPhone($phone){
        $this->phone = $phone;
    }
    public function setPassword($password){
        $this->password = $password;
    }
    public function setStatus($status){
        $this->status = $status;
    }
    public function setToken($token){
        $this->token = $token;
    }

    public function setAll($mail, $lastName, $firstName, $phone, $password, $status, $token){
        $this->mail = $mail;
        $this->lastName = $lastName;
        $this->firstName = $firstName;
        $this->phone = $phone;
        $this->password = $password;
        $this->status = $status;
        $this->token = $token;
    }

    //TOKEN
    public function generateToken(){
        return uniqid();
    }
    public function initializeToken(){
        $this->token = $this->generateToken();
    }

    //VERIFICATION
    public function isValidToken($token){
        return $token === $this->token;
    }
    public function isValid($mailArray){
        return (strlen($this->password) >= 5 && count($mailArray)<1 && $this->isValidPhone());
    }
    public function isValidPassword($hashPassword){
        return password_verify($this->password, $hashPassword);
    } 
    public function isValidPhone(){
        if (!preg_match("/^[0-9]{10}$/", $this->phone) || strlen($this->phone) != 10) {
            return false;
        }else{
            return true;
        }
    }
    public function getErrors($mailArray=[]){ //On récupère le mailArray, mais il est optionnel. On ne le donne que si on veut vérifier si le mail est déjà utilisé
        $errors = [];
        if (strlen($this->password) < 5) {
            $errors[] = "Le mot de passe doit avoir au moins 5 caractères";
        }
        foreach ($mailArray as $mail) {
            if ($this->mail === $mail["mail"]) {
                $errors[] = "Le mail est déjà utilisé";
            }
        }
        if(!$this->isValidPhone()){
            $errors[] = "Le téléphone doit être composé de 10 chiffres";
        }

        return $errors;
    }

    //MANIP BDD
    public function sanitizeData(){
        $this->mail=htmlspecialchars(strip_tags($this->mail));
        $this->lastName=htmlspecialchars(strip_tags($this->lastName));
        $this->firstName=htmlspecialchars(strip_tags($this->firstName));
        $this->phone=htmlspecialchars(strip_tags($this->phone));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->token=htmlspecialchars(strip_tags($this->token));
        $this->status=htmlspecialchars(strip_tags($this->status));     
    }

    public function createUser(){
        $this->sanitizeData();
        $queryInsertUser = "INSERT INTO users(mail, last_name, first_name, phone, password, token, status) VALUES(:mail, :last_name, :first_name, :phone, :password, :token, :status)";
        $insertUser = $this->bdd -> prepare($queryInsertUser);
        $insertUser -> execute([
            ":mail"=>$this->mail,
            ":last_name"=>$this->lastName,
            ":first_name"=>$this->firstName,
            ":phone"=>$this->phone,
            ":password"=>password_hash($this->password, PASSWORD_DEFAULT),
            ":token"=>$this->token, 
            ":status"=>$this->status
        ]);
    }

    public function selectUser(){
        $querySelectUser = "SELECT * FROM users WHERE mail=:mail";
        $selectUser = $this->bdd -> prepare($querySelectUser);
        $selectUser -> execute([
            ":mail"=>$this->mail
        ]);
        return $selectUser -> fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateToken(){
        $requestUpdateUser = "UPDATE users SET token=:token WHERE mail=:mail";
        $updateUser = $this->bdd -> prepare($requestUpdateUser);
        $updateUser -> execute([
            ":token" => $this->token,
            ":mail" => $this->mail
        ]);
    }
}
?>