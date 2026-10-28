<?php
class Contact{
    private $id;
    private $mail;
    private $lastName;
    private $firstName;
    private $phone;
    private $bdd;

    public function __construct($bdd){
        $this->bdd = $bdd;
    }

    //GETTERS
    public function getId(){
        return $this->id;
    }
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

    //SETTERS
    public function setId($id){
        $this->id = $id;
    }
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
    public function setAll($id, $mail, $lastName, $firstName, $phone){
        $this->id = $id;
        $this->mail = $mail;
        $this->lastName = $lastName;
        $this->firstName = $firstName;
        $this->phone = $phone;
    }
    public function setAllExceptId($mail, $lastName, $firstName, $phone){
        $this->mail = $mail;
        $this->lastName = $lastName;
        $this->firstName = $firstName;
        $this->phone = $phone;
    }

    //VERIFICATION
    public function isValid($mailArray){
        return ($this->isValidPhone() && $this->isValidMail($mailArray));
    }
    public function isValidPhone(){
        if (!preg_match("/^[0-9]{10}$/", $this->phone) || strlen($this->phone) != 10) {
            return false;
        }else{
            return true;
        }
    }
    public function isValidMail($contacts){
        $isValidMail = true;
        foreach($contacts as $contact){
            if($contact['mail'] == $this->mail){
                $isValidMail = false;
            }
        }
        return $isValidMail;
    }
    public function isValidId($contacts){
        $isExistingContact = false;
        foreach($contacts as $contact){
            if($contact['id'] == $this->id){
                $isExistingContact = true;
            }
        }
        return $isExistingContact;
    }
    public function getErrors($mailArray){
        $errors = array();
        if(!$this->isValidPhone()){
            $errors[] = "Le téléphone doit être composé de 10 chiffres";
        }
        if(!$this->isValidMail($mailArray)){
            $errors[] = "Le mail est déjà utilisé";
        }
        return $errors;
    }

    //MANIPULATION BDD
    private function sanitizeData(){
        $this->mail=htmlspecialchars(strip_tags($this->mail));
        $this->lastName=htmlspecialchars(strip_tags($this->lastName));
        $this->firstName=htmlspecialchars(strip_tags($this->firstName));
        $this->phone=htmlspecialchars(strip_tags($this->phone));
    }

    public function createContact(){
        $queryCreate = "INSERT INTO contact(mail, last_name, first_name, phone) VALUES(:mail, :last_name, :first_name, :phone)";
        $createContact = $this->bdd -> prepare($queryCreate);
        $createContact -> execute([
            ":mail" => $this->mail,
            ":last_name" => $this->lastName,
            ":first_name" => $this->firstName,
            ":phone" => $this->phone
        ]);
    }

    public function selectContact(){
        $querySelect = "SELECT * FROM contact WHERE id=:id";
        $selectContact = $this->bdd -> prepare($querySelect);
        $selectContact -> execute([
            ":id" => $this->id
        ]);
        $contact = $selectContact -> fetchAll(PDO::FETCH_ASSOC);
        return $contact;
    }

    public function selectAllContacts(){
        $querySelectAll = "SELECT * FROM contact";
        $selectAll = $this->bdd -> prepare($querySelectAll);
        $selectAll -> execute();
        $contacts = $selectAll -> fetchAll(PDO::FETCH_ASSOC);
        return $contacts;
    }

    public function deleteContact(){
        $queryDelete = "DELETE FROM contact WHERE id=:id";
        $deleteContact = $this->bdd -> prepare($queryDelete);
        $deleteContact -> execute([
            ":id" => $this->id
        ]);
    }

    public function updateContact(){
        $queryUpdate = "UPDATE contact SET mail=:mail, last_name=:last_name, first_name=:first_name, phone=:phone WHERE id=:id";
        $updateContact = $this->bdd -> prepare($queryUpdate);
        $updateContact -> execute([
            ":id" => $this->id,
            ":mail" => $this->mail,
            ":last_name" => $this->lastName,
            ":first_name" => $this->firstName,
            ":phone" => $this->phone
        ]);
    }
}
?>