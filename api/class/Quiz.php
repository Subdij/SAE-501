<?php
    class Quiz{
        private $bdd;
        private $mail;
        private $transport_type;
        private $transport_time;
        private $decouverte;
        private $bac;
        private $favorite_domain;
        private $age;
        private $satisfaction;
        private $schools;
        private $code_postal;
        private $etablissement;

    public function __construct($bdd, $mail, $transport_type, $transport_time, $decouverte, $bac, $favorite_domain, $age, $satisfaction, $schools, $code_postal, $etablissement){
        $this->bdd = $bdd;
        $this->mail = $mail;
        $this->transport_type = $transport_type;
        $this->transport_time = $transport_time;
        $this->decouverte = $decouverte;
        $this->bac = $bac;
        $this->favorite_domain = $favorite_domain;
        $this->age = $age;
        $this->satisfaction = $satisfaction;
        $this->schools = $schools;
        $this->code_postal = $code_postal;
        $this->etablissement = $etablissement;
    }
    
    public function pushQuiz(): bool{
        $requestUserExists = "SELECT mail FROM users WHERE mail=:mail";
        $userExists = $this->bdd -> prepare($requestUserExists);
        $userExists -> execute([
            ":mail"=>$this->mail
        ]);
        $user = $userExists -> fetchAll(PDO::FETCH_ASSOC);
        if (empty($user)){
            return false;
        }
        $requestSelectQuiz = "SELECT user FROM quiz WHERE user=:user";
        $selectQuiz = $this->bdd -> prepare($requestSelectQuiz);
        $selectQuiz -> execute([
            ":user"=>$this->mail
        ]);
        $quiz = $selectQuiz -> fetchAll(PDO::FETCH_ASSOC);
        if (empty($quiz)){
            $requestInsertQuiz = "INSERT INTO quiz(user, transport_type, transport_time, decouverte, bac, favorite_domain, age, satisfaction, schools, code_postal, etablissement) VALUES(:user, :transport_type, :transport_time, :decouverte, :bac, :favorite_domain, :age, :satisfaction, :schools, :code_postal, :etablissement)";
            $insertQuiz = $this->bdd -> prepare($requestInsertQuiz);
            $result = $insertQuiz -> execute([
                    ":user"=>$this->mail,
                    ":transport_type"=>$this->transport_type,
                    ":transport_time"=>$this->transport_time,
                    ":bac"=>$this->bac,
                    ":decouverte"=>$this->decouverte,
                    ":favorite_domain"=>$this->favorite_domain,
                    ":age"=>$this->age,
                    ":satisfaction"=>$this->satisfaction,
                    ":schools"=>$this->schools,
                    ":code_postal"=>$this->code_postal,
                    ":etablissement"=>$this->etablissement
            ]);
        }
        else{
            $requestUpdateQuiz = "UPDATE quiz SET transport_type=:transport_type, transport_time=:transport_time, decouverte=:decouverte, bac=:bac, favorite_domain=:favorite_domain, age=:age, satisfaction=:satisfaction, schools=:schools , code_postal=:code_postal, etablissement=:etablissement WHERE user=:user";
            $updateQuiz = $this->bdd -> prepare($requestUpdateQuiz);
            $result = $updateQuiz -> execute([
                ":user"=>$this->mail,
                ":transport_type"=>$this->transport_type,
                ":transport_time"=>$this->transport_time,
                ":bac"=>$this->bac,
                ":decouverte"=>$this->decouverte,
                ":favorite_domain"=>$this->favorite_domain,
                ":age"=>$this->age,
                ":satisfaction"=>$this->satisfaction,
                ":schools"=>$this->schools,
                ":code_postal"=>$this->code_postal,
                ":etablissement"=>$this->etablissement
            ]);
        }
        return $result;
    }

    public function checkAnswers(): bool{
        //Variable servant à stocker les arrays qu'on va créer à partir des strings
        $temp = array();
        $temp = explode(";", $this->transport_type);

        //On check si chaque valeur de l'array est bien dans la liste des réponses possibles
        foreach ($temp as $value){
            if (!in_array($value, ANSWERS_TRANSPORT_TYPE)){
                return false;
            }
        }
        if (!in_array($this->transport_time, ANSWERS_TRANSPORT_TIME)){
            return false;
        }
        if (!in_array($this->decouverte, ANSWERS_DECOUVERTE)){
            return false;
        }
        if (!in_array($this->bac, ANSWERS_BAC)){
            return false;
        }
        $temp = explode(";", $this->favorite_domain);
        foreach ($temp as $value){
            if (!in_array($value, ANSWERS_FAVORITE_DOMAIN)){
                return false;
            }
        }
        if($this->satisfaction < 0 || $this->satisfaction > 5){
            return false;
        }
        if (strlen($this->code_postal) != 5){
            echo "AAAAA";
            return false;
        }
        return true;
    }

    public function getQuiz(){
        $requestSelectQuiz = "SELECT q.user, q.etablissement, q.code_postal, q.schools, u.first_name, u.last_name FROM quiz q JOIN users u ON q.user = u.mail WHERE q.user=:user";
        $selectQuiz = $this->bdd->prepare($requestSelectQuiz);
        $selectQuiz->execute([
            ":user" => $this->mail
        ]);
        return $selectQuiz -> fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllAnswers(){
        $requestSelectQuiz = "SELECT q.user, q.etablissement, q.code_postal, q.schools, u.first_name, u.last_name FROM quiz q JOIN users u ON q.user = u.mail";
        $selectQuiz = $this->bdd->prepare($requestSelectQuiz);
        $selectQuiz->execute();
        return $selectQuiz -> fetchAll(PDO::FETCH_ASSOC);
    }
}


?>