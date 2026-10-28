import { Component, Inject, Input } from '@angular/core';
import { PopupData } from 'src/app/models/popup-data';
import { PopupType } from 'src/app/models/popup-type';
import { PopupService } from 'src/app/service/popup.service';
import { GetUserService } from 'src/app/service/get-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageError } from '../form-error/message-error';
import { ProjectService } from 'src/app/service/project.service';

interface EditUser{
  mail: string,
  first_name: string,
  last_name: string,
  phone: string
}
@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent {
  @Input() popupData: PopupData[] = [];

  project!: boolean;
  imgSrc!: string;
  title!: string;
  desc!: string;
  btn!: string;
  private addUserForm = {};
  userErrors: MessageError[] = [];
  isSubmit: boolean = false;
  isProjectSubmit: boolean = false;
  projectErrors: MessageError[] = [];
  userById: EditUser = {
    mail: "",
    first_name: "",
    last_name: "",
    phone: ""
  };
  fileName: string = '';
  selectedFile!: {link: string, file: any, name: string};

  onFileSelected(event: any){
    //Permet d'afficher le nom du fichier sélectionné par l'utilisateur
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
    }
    //Gère l'envoi de l'image
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.selectedFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Informations relatives à l'affichage du popup d'ajout
  add: PopupData = {
    imgSrc: "../../../assets/images/icones/add.png",
    title: "Ajouter un utilisateur",
    desc: "Ajouter un utilisateur dans la base de données.",
    btn: "Ajouter",
    project: false
  }
  addProject: PopupData = {
    imgSrc: "../../../assets/images/icones/add.png",
    title: "Ajouter un projet",
    desc: "Ajouter un projet dans la base de données.",
    btn: "Ajouter",
    project: true
  }
  
  //Informations relatives à l'affichage du popup de modification
  edit: PopupData = {
    imgSrc: "../../../assets/images/icones/edit.png",
    title: "Modifier l’utilisateur",
    desc: "Modifier les paramètres de l’utilisateur dans la base de données.",
    btn: "Modifier",
    project: false
  }
  editProject: PopupData = {
    imgSrc: "../../../assets/images/icones/edit.png",
    title: "Modifier le projet",
    desc: "Modifier les paramètres du projet dans la base de données.",
    btn: "Modifier",
    project: true
  }
  closePopup(){
    this.popupService.closePopup();
  }

  //Création du ReactiveForm pour l'ajout d'utilisateurs
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")])
  });

  //return true ou false si tous les input sont rempli ou non
  isAllUserInputRequired(): boolean{
    if (
    this.userForm.get('email')?.hasError('required') &&
    this.userForm.get('firstName')?.hasError('required') &&
    this.userForm.get('lastName')?.hasError('required') &&
    this.userForm.get('phoneNumber')?.hasError('required')
    ){
      return true;
    } else {
      return false;
    }
  }
  isAllProjectInputRequired(): boolean{
    if (
      this.projectForm.get('title')?.hasError('required') &&
      this.projectForm.get('image')?.hasError('required') &&
      this.projectForm.get('description')?.hasError('required') &&
      this.projectForm.get('author')?.hasError('required') &&
      this.projectForm.get('study_year')?.hasError('required') &&
      this.projectForm.get('date')?.hasError('required') &&
      this.projectForm.get('link')?.hasError('required')
    ){
      return true;
    } else {
      return false;
    }
  }
  //Vérifie s'il y a une au moins une erreur. Retourne true si c'est le cas
  isAtLeastOneError(): boolean{
    let isOneError = false;
    for(let error of this.userErrors){
      if(error.condition() === true){
        isOneError = true;
      }
    }
    return isOneError;
  }
  //Vérifie que la valeur entrée est située entre le min et le max
  numberRange(min: number, max: number): ValidatorFn {
    return this.projectService.numberRange(min, max);
    };

  //Fonction lancée lorsque l'utilisateur clique sur l'input type submit
  onUserSubmit(){
    this.isSubmit = true;
    //Récupère les valeurs entrées par l'utilisateur
    if(this.data.type == "add"){
      this.addUserForm = {
        "mail": this.userForm.value.email,
        "lastName": this.userForm.value.lastName,
        "firstName": this.userForm.value.firstName,
        "phone": this.userForm.value.phoneNumber
      };
      //Ajoute l'utilisateur s'il n'y a pas d'erreurs dans le formulaire avec la méthode créée dans getUserService
      if (this.userForm.valid) {
        this.getUserService.addUser(this.addUserForm).subscribe(response => {
            this.popupService.userAdded.emit();
            this.closePopup();
            this.isSubmit = false;
          },
          error => {
            const errorMessage: MessageError = { condition: () => true, message: "E-mail déjà utilisé" };
            this.userErrors.push(errorMessage);
          }
        );
      };
    }
    if (this.userForm.valid && this.data.type == "edit") {
      let tabToSend = this.userForm.value;
      tabToSend["id"] = this.data2.userId;
      this.getUserService.editUser(tabToSend).subscribe((response) => {
        this.popupService.userEdited.emit();
        this.closePopup();
        this.isSubmit = false;
      });
    }
  }

  //Création du ReactiveForm pour l'ajout de projets
  projectForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    image: this.data.type == 'add' ? new FormControl('', Validators.required) : new FormControl(''),
    description: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    study_year: new FormControl('', [Validators.required, this.numberRange(1, 3)]),
    date: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
  });

  onProjectSubmit(){
    this.isProjectSubmit = true;
    if (this.data.type == "add"){
      const formData = new FormData();
      formData.append('title', this.projectForm.value.title);
      formData.append('description', this.projectForm.value.description);
      formData.append('author', this.projectForm.value.author);
      formData.append('study_year', this.projectForm.value.study_year);
      formData.append('date', this.projectForm.value.date);
      formData.append('link', this.projectForm.value.link);
    
      if(this.projectForm.valid){
        this.projectService.addProject(formData, this.selectedFile.file).subscribe(
          () => {
            this.popupService.projectAdded.emit();
            this.closePopup();
          });
      }
    }

    if(this.data.type == "edit"){
      let formData = new FormData();
      formData.append('id', this.data3.projectId.toString());
      formData.append('title', this.projectForm.value.title);
      formData.append('description', this.projectForm.value.description);
      formData.append('author', this.projectForm.value.author);
      formData.append('study_year', this.projectForm.value.study_year);
      formData.append('date', this.projectForm.value.date);
      formData.append('link', this.projectForm.value.link);
      if(this.projectForm.valid && !this.selectedFile?.file){
        this.projectService.editProject(formData).subscribe(
          () => {
            this.popupService.projectEdited.emit();
            this.closePopup();
            this.isProjectSubmit = false;
          });
      } else if(this.projectForm.valid && this.selectedFile.file){
        this.projectService.editProject(formData, this.selectedFile.file).subscribe(
          () => {
            this.popupService.projectEdited.emit();
            this.closePopup();
            this.isProjectSubmit = false;
          });
      }
    };
  }

  //Récupère et affiche les données de l'utilisateur dans le popup
  getUserById(){
    this.getUserService.getUserById(this.data2.userId).subscribe((response) => {
      this.userForm.patchValue({
        "email": response[0].mail,
        "firstName": response[0].first_name,
        "lastName": response[0].last_name,
        "phoneNumber": response[0].phone
      });
    });
  }

  //Récupère et affiche les données du projet dans le popup
  getProjectById(){
    this.projectService.getProjectById(this.data3.projectId).subscribe((response) => {
      this.projectForm.patchValue({
        "id": this.data3.projectId,
        "title": this.replaceCodeByString(response.title),
        "description": this.replaceCodeByString(response.description),
        "author": response.author,
        "study_year": response.study_year,
        "date": response.date,
        "link": response.link
      });
    });
  }

  constructor(private popupService: PopupService, 
    public dialogRef: MatDialogRef<AddPopupComponent>,
    private getUserService: GetUserService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: PopupType,
    @Inject(MAT_DIALOG_DATA) public data2: { userId: number},
    @Inject(MAT_DIALOG_DATA) public data3: {projectId: number}) {
      this.userErrors = [
        {
          condition: () => this.userForm.get('email')?.hasError('email'),
          message: "Veuillez renseigner un email valide"
        },
        {
          condition: () => this.userForm.get('email')?.hasError('required') && !(this.userForm.get('firstName')?.hasError('required') && this.userForm.get('lastName')?.hasError('required') && this.userForm.get('phoneNumber')?.hasError('required')),
          message: "Champ email requis"
        },
        {
          condition: () => this.userForm.get('firstName')?.hasError('required') && !(this.userForm.get('email')?.hasError('required') && this.userForm.get('lastName')?.hasError('required') && this.userForm.get('phoneNumber')?.hasError('required')),
          message: "Champ prénom requis"
        },
        {
          condition: () => this.userForm.get('lastName')?.hasError('required') && !(this.userForm.get('email')?.hasError('required') && this.userForm.get('firstName')?.hasError('required') && this.userForm.get('phoneNumber')?.hasError('required')),
          message: "Champ nom requis"
        },
        {
          condition: () => this.userForm.get('phoneNumber')?.hasError('required') && !(this.userForm.get('email')?.hasError('required') && this.userForm.get('firstName')?.hasError('required') && this.userForm.get('lastName')?.hasError('required')),
          message: "Champ Numéro de téléphone requis"
        },
        {
          condition: () => this.userForm.get('phoneNumber')?.hasError('pattern'),
          message: "Veuilez renseigner un téléphone valide"
        },
        {
          condition: () => this.isAllUserInputRequired(),
          message: "Tous les champs sont requis"
        }
      ];
      this.projectErrors = [
        {
          condition: () => this.projectForm.get('title')?.hasError('required') && !(this.projectForm.get('image')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('date')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Champs titre requis"
        },
        {
          condition: () => this.projectForm.get('image')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('date')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Veuillez ajouter une image"
        },
        {
          condition: () => this.projectForm.get('description')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('image')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('date')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Champs description requis"
        },
        {
          condition: () => this.projectForm.get('author')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('image')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('date')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Champs auteur requis"
        },
        {
          condition: () => this.projectForm.get('study_year')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('image')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('date')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Champs année d'étude requis"
        },
        {
          condition: () => this.projectForm.get('date')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('image')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('link')?.hasError('required')),
          message: "Champs date requis"
        },
        {
          condition: () => this.projectForm.get('link')?.hasError('required') && !(this.projectForm.get('title')?.hasError('required') && this.projectForm.get('image')?.hasError('required') && this.projectForm.get('description')?.hasError('required') && this.projectForm.get('author')?.hasError('required') && this.projectForm.get('study_year')?.hasError('required') && this.projectForm.get('date')?.hasError('required')),
          message: "Champs lien requis"
        },
        {
          condition: () => this.projectForm.get('study_year')?.hasError('outOfRange'),
          message: "Veuillez remplir un chiffre entre 1 et 3"
        },
        {
          condition: () => this.isAllProjectInputRequired(),
          message: "Tous les champs sont requis"
        }
      ];
    }

    ngOnInit(){
      console.log(this.data.type);
      console.log(this.data.project);
      //Applique les informations définies précédemment en fonction du type du popup
      if(this.data.type =="add"){
        this.imgSrc = this.add.imgSrc;
        this.title = this.add.title;
        this.desc = this.add.desc;
        this.btn = this.add.btn;
        //Change les informations du popup pour la gestion des projets en fonction de la valeur de project
        if (this.data.project == true){
          this.project = true;
          this.title = this.addProject.title;
          this.desc = this.addProject.desc;
        }
      };
      if(this.data.type == "edit"){
        this.imgSrc = this.edit.imgSrc;
        this.title = this.replaceCodeByString(this.edit.title);
        this.desc = this.replaceCodeByString(this.edit.desc);
        this.btn = this.edit.btn;
        if (this.data.project == true){
          this.project = true;
          this.title = this.replaceCodeByString(this.editProject.title);
          this.desc = this.replaceCodeByString(this.editProject.desc);
        }
      };
      if (this.data2.userId){
        this.getUserById();
      };
      if (this.data3.projectId){
        this.getProjectById();
      }
    }

    replaceCodeByString(value: string) {
      return value.replaceAll("&#039;", "'");
    }  
}
