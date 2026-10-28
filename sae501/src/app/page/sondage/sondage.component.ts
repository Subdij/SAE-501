import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageError } from 'src/app/component/form-error/message-error';
import { RadioData } from 'src/app/models/radio-data';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SondageService } from 'src/app/service/sondage.service';
@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.scss']
})
export class SondageComponent {
  dataSaved: boolean = false;
  sondageForm = {};
  isSubmit: boolean = false;
  errors: MessageError[] = [];
  styleError = {
    backgroundColor: "white",
    marginBottom: "30px"
  }
  constructor(private authentication: AuthenticationService, private sondageService : SondageService, private toastr: ToastrService){
    this.authentication.redirectIfNotAuthenticated();
    this.sondageService.isAlreadyFilled();
    this.sondageService.getIsAlreadyFilled$().subscribe((isAlreadyFilled) => {
      this.dataSaved = isAlreadyFilled;
    });
    this.errors = [
        {
          condition: () => this.formSurvey.get('etablissement')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 1 est requise"
        },
        {
          condition: () => this.formSurvey.get('age')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 2 est requise"
        },
        {
          condition: () => this.formSurvey.get('codePostal')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 3 est requise"
        },
        {
          condition: () => this.formSurvey.get('decouverte')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 4 est requise"
        },
        {
          condition: () => this.isRequiredCheckbox(this.formSurvey.get('favorite_domain')?.value) && !this.isAllInputRequired(),
          message: "La question 5 est requise"
        },
        {
          condition: () => this.formSurvey.get('bac')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 6 est requise"
        },
        {
          condition: () => this.isRequiredCheckbox(this.formSurvey.get('transport_type')?.value) && !this.isAllInputRequired(),
          message: "La question 7 est requise"
        },
        {
          condition: () => this.formSurvey.get('transport_time')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 8 est requise"
        },
        {
          condition: () => this.formSurvey.get('schools')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 9 est requise. Si aucune autre école ne vous intéresse merci de noter : Aucune"
        },
        {
          condition: () => this.formSurvey.get('satisfaction')?.hasError('required') && !this.isAllInputRequired(),
          message: "La question 10 est requise"
        },
        {
          condition: () => this.isAllInputRequired(),
          message: "Toutes les questions sont requises"
        },
    ];
  }

  checkbox1: RadioData[] = [
    {
      rep: "Développement Web",
      value: "developpement_web",
      name: "favorite_domain"  
    },
    {
      rep: "Création de jeux vidéo",
      value: "creation_jeux_video",
      name: "favorite_domain"  
    },
    {
      rep: "Design",
      value: "design",
      name: "favorite_domain"  
    },
    {
      rep: "Graphisme",
      value: "graphisme",
      name: "favorite_domain"  
    },
    {
      rep: "Audiovisuel",
      value: "audiovisuel",
      name: "favorite_domain"  
    }
  ]
  checkbox2: RadioData[] = [
    {
      rep: "A pied",
      value: "pied",
      name: "transport_type"  
    },
    {
      rep: "A vélo / Trotinette",
      value: "velo_trotinette",
      name: "transport_type"  
    },
    {
      rep: "En train",
      value: "train",
      name: "transport_type"  
    },
    {
      rep: "En voiture",
      value: "voiture",
      name: "transport_type"  
    },
    {
      rep: "En bus",
      value: "bus",
      name: "transport_type"  
    }
  ]

  formSurvey: FormGroup = new FormGroup({
    etablissement: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    codePostal: new FormControl('', Validators.required),
    favorite_domain: new FormArray([new FormControl(false), new FormControl(false), new FormControl(false), new FormControl(false), new FormControl(false)]),
    bac: new FormControl('', Validators.required),
    transport_type: new FormArray([new FormControl(false), new FormControl(false), new FormControl(false), new FormControl(false), new FormControl(false)]),
    transport_time: new FormControl('', Validators.required),
    schools: new FormControl('', Validators.required),
    satisfaction: new FormControl('', Validators.required),
    decouverte: new FormControl('', Validators.required)
  });

  onSubmit(){
    this.isSubmit = true;
    if(this.formSurvey.valid){
      let favoriteDomain = this.convertCheckboxToString(this.formSurvey.value.favorite_domain, this.checkbox1);
      let transportType = this.convertCheckboxToString(this.formSurvey.value.transport_type, this.checkbox2);
  
      this.sondageForm = {
        "etablissement": this.formSurvey.value.etablissement,
        "age": this.formSurvey.value.age,
        "code_postal": this.formSurvey.value.codePostal,
        "bac": this.formSurvey.value.bac,
        "transport_time": this.formSurvey.value.transport_time,
        "schools": this.formSurvey.value.schools,
        "satisfaction": this.formSurvey.value.satisfaction,
        "decouverte": this.formSurvey.value.decouverte,
        "favorite_domain": favoriteDomain,
        "transport_type": transportType,
        "mail": localStorage.getItem('mail')
      };
  
      this.sondageService.addResponse(this.sondageForm).subscribe(
        (response) => {
        this.toastr.success('Vos réponses ont été enregistré !');
        this.dataSaved = true;
        },
      );  
    }
  }

  convertCheckboxToString(tabResponse: Array<any>, tabData: RadioData[]): string{
    console.log(tabResponse);
    let tabResult = [];
    for (let index = 0; index < tabResponse.length; index++) {
      const element = tabResponse[index];
      if (element){
        tabResult.push(tabData[index].value);
      }
    }
    return tabResult.join(';');
  }

  getSatisfaction(satisfaction: number){
    this.formSurvey.get('satisfaction')?.setValue(satisfaction);
  }

  isAtLeastOneError(errors: MessageError[]): boolean{
    let isOneError = false;
    for(let error of errors){
      if(error.condition() === true){
        isOneError = true;
      }
    }
    return isOneError;
  }

  isRequiredCheckbox(values: boolean[]){
    let isCheckboxRequired = true;
    values.forEach((value) => {
      if(value){
        isCheckboxRequired = false;
      }
    });
    return isCheckboxRequired;
  }

  isAllInputRequired(){
    if(
      this.formSurvey.get('etablissement')?.hasError('required') &&
      this.formSurvey.get('age')?.hasError('required') &&
      this.formSurvey.get('codePostal')?.hasError('required') &&
      this.formSurvey.get('bac')?.hasError('required') &&
      this.formSurvey.get('transport_time')?.hasError('required') &&
      this.formSurvey.get('schools')?.hasError('required') &&
      this.formSurvey.get('satisfaction')?.hasError('required') &&
      this.formSurvey.get('decouverte')?.hasError('required') &&
      this.isRequiredCheckbox(this.formSurvey.get('favorite_domain')?.value) &&
      this.isRequiredCheckbox(this.formSurvey.get('transport_type')?.value)
    ){
      return true;
    }else{
      return false;
    }
  }
}