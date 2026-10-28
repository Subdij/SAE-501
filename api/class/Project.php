<?php
const ressourcesPath = "../../ressources/";
class Project{
    private $bdd;
    private $title;
    private $description;
    private $link;
    private $author;
    private $study_year;
    private $date;
    private $image;
    private $image_type;
    private $image_name;
    private $id;

    public function __construct($bdd){
        $this->bdd = $bdd;
    }

    //GETTERS
    public function getTitle(): string{
        return $this->title;
    }
    public function getDescription(): string{
        return $this->description;
    }
    public function getLink(): string{
        return $this->link;
    }
    public function getAuthor(): string{
        return $this->author;
    }
    public function getStudyYear(): string{
        return $this->study_year;
    }
    public function getDate(): string{
        return $this->date;
    }
    public function getImage(): array{
        return $this->image;
    }
    public function getImageType(): string{
        return $this->image_type;
    }
    public function getImageName(): string{
        return $this->image_name;
    }
    public function getId(): int{
        return $this->id;
    }
    

    //SETTERS
    public function setTitle($title){
        $this->title = $title;
    }
    public function setDescription($description){
        $this->description = $description;
    }
    public function setLink($link){
        $this->link = $link;
    }
    public function setAuthor($author){
        $this->author = $author;
    }
    public function setStudyYear($study_year){
        $this->study_year = $study_year;
    }
    public function setDate($date){
        $this->date = $date;
    }
    public function setImage($image){
        $this->image = $image;
        if($image == null){
            $this->image_type = "";
            $this->image_name = "";
            return;
        }
        $this->image_type = $image["type"];
        $this->image_name = $image["name"];
    }
    public function setImageName($image_name){
        $this->image_name = $image_name;
    }
    public function setId($id){
        $this->id = $id;
    }
    public function setAll($title, $description, $link, $author, $study_year, $date, $image){
        $this->title = $title;
        $this->description = $description;
        $this->link = $link;
        $this->author = $author;
        $this->study_year = $study_year;
        $this->date = $date;
        $this->image = $image;
        $this->image_type = $image["type"];
        $this->image_name = $image["name"];
    }

    public function validateImage(): bool{
        if($this->image == null){
            return true;
        }
        //Check if image is a using the right format
        if($this->image_type != "image/png" && $this->image_type != "image/jpeg" && $this->image_type != "image/jpg" && $this->image_type != "image/gif" && $this->image_type != "image/webp"){
            return false;
        }
        //Check if image is not too big
        if($this->image["size"] > 5000000){
            return false;
        }
        return true;
    }
    public function validateData(): bool{
        if($this->title == "" || $this->description == "" || $this->link == "" || $this->author == "" || $this->study_year == "" || $this->date == ""){
            return false;
        }
        if($this->study_year != "1" && $this->study_year != "2" && $this->study_year != "3"){
            return false;
        }
        
        //Check if date is formatted YYYY-MM-DD,if it's a valid date, and if it's in the past
        $date = explode("-", $this->date);
        if(count($date) != 3){
            return false;
        }
        if(strlen($date[0]) != 4 || strlen($date[1]) != 2 || strlen($date[2]) != 2){
            return false;
        }
        if(!checkdate($date[1], $date[2], $date[0])){
            return false;
        }
        if(strtotime($this->date) > time()){
            return false;
        }
        return true;
    }

    private function renameFile(): string{
        $extension = explode(".", $this->image_name);
        $extension = $extension[count($extension)-1];
        //Rename file if it already exists
        do {
            $newName = uniqid().".".$extension;
        } while (file_exists(ressourcesPath.$newName));
        return $newName;
    }

    private function sanitizeData(): void{
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->link=htmlspecialchars(strip_tags($this->link));
        $this->author=htmlspecialchars(strip_tags($this->author));
        $this->study_year=htmlspecialchars(strip_tags($this->study_year));
        $this->date=htmlspecialchars(strip_tags($this->date));

        $this->image_name=htmlspecialchars(strip_tags($this->image_name));
    }

    public function pushProject(): bool{
        $this->sanitizeData();
        $this->image_name = $this->renameFile();
        if(!file_exists(ressourcesPath)){
            mkdir(ressourcesPath);
        }
        if(!move_uploaded_file($this->image["tmp_name"], ressourcesPath.$this->image_name)){
            return false;
        }
        $requestInsertProject = "INSERT INTO projects(title, description, link, author, study_year, date, image) VALUES(:title, :description, :link, :author, :study_year, :date, :image)";
        $insertProject = $this->bdd -> prepare($requestInsertProject);
        try{
            $result = $insertProject -> execute([
                    ":title"=>$this->title,
                    ":description"=>$this->description,
                    ":link"=>$this->link,
                    ":author"=>$this->author,
                    ":study_year"=>$this->study_year,
                    ":date"=>$this->date,
                    ":image"=>$this->image_name
            ]);
        }catch(Exception $e){
            unlink(ressourcesPath.$this->image_name);
            return false;
        }
        return $result;
    }

    public function getProject(): array{
        $project = [];
        $requestGetProject = "SELECT * FROM projects WHERE id = :id";
        $getProject = $this->bdd -> prepare($requestGetProject);
        $getProject -> execute([":id"=>$this->id]);
        if($getProject -> rowCount() == 0){
            return [];
        }
        $project = $getProject->fetch(PDO::FETCH_ASSOC);
        return $project;
    }

    public function getAllProjects(): array{
        $requestGetProjects = "SELECT * FROM projects";
        $getProjects = $this->bdd -> prepare($requestGetProjects);
        $getProjects -> execute();
        if($getProjects -> rowCount() == 0){
            return [];
        }
        while($project = $getProjects->fetch(PDO::FETCH_ASSOC)){
            $projects[] = $project;
        }
        return $projects;
    }

    public function deleteProject(): bool{
        $requestCheckProject = "SELECT * FROM projects WHERE id = :id";
        $checkProject = $this->bdd -> prepare($requestCheckProject);
        $checkProject -> execute([":id"=>$this->id]);
        if($checkProject -> rowCount() == 0){
            return false;
        }
        $requestDeleteProject = "DELETE FROM projects WHERE id = :id";
        $deleteProject = $this->bdd -> prepare($requestDeleteProject);
        if(!$deleteProject -> execute([":id"=>$this->id])){
            return false;
        }
        unlink(ressourcesPath.$checkProject->fetch()["image"]);
        return true;
    }

    public function editProject(): bool{
        $this->sanitizeData();
        $requestCheckProject = "SELECT * FROM projects WHERE id = :id";
        $checkProject = $this->bdd -> prepare($requestCheckProject);
        $checkProject -> execute([":id"=>$this->id]);
        if($checkProject -> rowCount() == 0){
            return false;
        }
        if($this->image == null){
            $requestEditProject = "UPDATE projects SET title = :title, description = :description, link = :link, author = :author, study_year = :study_year, date = :date WHERE id = :id";
            $editProject = $this->bdd -> prepare($requestEditProject);
            try{
                $result = $editProject -> execute([
                    ":title"=>$this->title,
                    ":description"=>$this->description,
                    ":link"=>$this->link,
                    ":author"=>$this->author,
                    ":study_year"=>$this->study_year,
                    ":date"=>$this->date,
                    ":id"=>$this->id
                ]);
            }catch(Exception $e){
                return false;
            }
            return $result;
            exit();
        }
        $requestLastImage = "SELECT image FROM projects WHERE id = :id";
        $lastImage = $this->bdd -> prepare($requestLastImage);
        $lastImage -> execute([":id"=>$this->id]);
        $lastImage = $lastImage->fetch()["image"];
        unlink(ressourcesPath.$lastImage);
        
        $this->image_name = $this->renameFile();
        if(!move_uploaded_file($this->image["tmp_name"], ressourcesPath.$this->image_name)){
            return false;
        }
        $requestCheckProject = "SELECT * FROM projects WHERE id = :id";
        $checkProject = $this->bdd -> prepare($requestCheckProject);
        $checkProject -> execute([":id"=>$this->id]);
        if($checkProject -> rowCount() == 0){
            return false;
        }
        $requestEditProject = "UPDATE projects SET title = :title, description = :description, image = :image, link = :link, author = :author, study_year = :study_year, date = :date WHERE id = :id";
        $editProject = $this->bdd -> prepare($requestEditProject);
        try{
            $result = $editProject -> execute([
                ":title"=>$this->title,
                ":description"=>$this->description,
                ":image"=>$this->image_name,
                ":link"=>$this->link,
                ":author"=>$this->author,
                ":study_year"=>$this->study_year,
                ":date"=>$this->date,
                ":id"=>$this->id
            ]);
        }catch(Exception $e){
            return false;
        }
        return $result;
    }

}
?>