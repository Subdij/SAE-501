<?php
class Stats{
    private $bdd;

    public function __construct($bdd){
        $this->bdd = $bdd;
    }

    public function getStatsAge(){
        $query = "SELECT age FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $age = array();
        foreach($result as $row){
            array_push($age, $row["age"]);
        }
        $nombreResults = count($age);
        $sum = 0;
        foreach($age as $a){
            $sum += $a;
        }
        $moyenneAge = $sum / $nombreResults;
        sort($age);
        $middle = floor((count($age) - 1) / 2);
        if (count($age) % 2) {
            $medianeAge = $age[$middle];
        } else {
            $medianeAge = ($age[$middle] + $age[$middle + 1]) / 2.0;
        }
        $maxAge = max($age);
        $minAge = min($age);
        return array(
            "moyenne" => $moyenneAge,
            "mediane" => $medianeAge,
            "max" => $maxAge,
            "min" => $minAge,
            "total" => $nombreResults
        );
    }

    public function getStatsSatisfaction(){
        $query = "SELECT satisfaction FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $satisfaction = array();
        foreach($result as $row){
            array_push($satisfaction, $row["satisfaction"]);
        }
        $nombreResults = count($satisfaction);
        $sum = 0;
        foreach($satisfaction as $s){
            $sum += $s;
        }
        $moyenneSatisfaction = $sum / $nombreResults;
        sort($satisfaction);
        $middle = floor((count($satisfaction) - 1) / 2);
        if (count($satisfaction) % 2) {
            $medianeSatisfaction = $satisfaction[$middle];
        } else {
            $medianeSatisfaction = ($satisfaction[$middle] + $satisfaction[$middle + 1]) / 2.0;
        }
        $maxSatisfaction = max($satisfaction);
        $minSatisfaction = min($satisfaction);
        return array(
            "moyenne" => $moyenneSatisfaction,
            "mediane" => $medianeSatisfaction,
            "max" => $maxSatisfaction,
            "min" => $minSatisfaction,
            "total" => $nombreResults,
        );
    }

    public function getStatsTransportTime(){
        $return = array();
        foreach(ANSWERS_TRANSPORT_TIME as $answer){
            $query = "SELECT transport_time FROM quiz WHERE transport_time=:transport_time";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([
                ":transport_time"=>$answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
        }
        $query = "SELECT transport_time FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["total"] = count($result);
        return $return;
    }

    public function getStatsBac(){
        $return = array();
        foreach(ANSWERS_BAC as $answer){
            $query = "SELECT bac FROM quiz WHERE bac=:bac";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([
                ":bac"=>$answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
        }
        $query = "SELECT bac FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["total"] = count($result);
        return $return;
    }

    public function getStatsTransportType(){
        $return = array();
        foreach(ANSWERS_TRANSPORT_TYPE as $answer){
            $query = "SELECT transport_type FROM quiz WHERE transport_type LIKE CONCAT('%', :transport_type, '%')";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([
                ":transport_type" => $answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
            $stmt->execute([
                ":transport_type"=>$answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
        }
        $query = "SELECT transport_type FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["most_used_transport"] = array_search(max($return), $return);
        $return["percentage_most_used_transport"] = $return[$return["most_used_transport"]] / count($result) * 100;
        $return["total"] = count($result);
        return $return;
    }

    public function getStatsFavoriteDomain(){
        $return = array();
        foreach(ANSWERS_FAVORITE_DOMAIN as $answer){
            $query = "SELECT favorite_domain FROM quiz WHERE favorite_domain LIKE CONCAT('%', :favorite_domain, '%')";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([
                ":favorite_domain"=>$answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
        }
        $query = "SELECT favorite_domain FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["total"] = count($result);
        return $return;
    }

    public function getStatsDecouverte(){
        $return = array();
        foreach(ANSWERS_DECOUVERTE as $answer){
            $query = "SELECT decouverte FROM quiz WHERE decouverte=:decouverte";
            $stmt = $this->bdd->prepare($query);
            $stmt->execute([
                ":decouverte"=>$answer
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return[$answer] = count($result);
        }
        $query = "SELECT decouverte FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["total"] = count($result);
        return $return;
    }

    public function getStatsTotal(){
        $query = "SELECT * FROM quiz";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $return["total"] = count($result);
        return $return;
    }
}
?>