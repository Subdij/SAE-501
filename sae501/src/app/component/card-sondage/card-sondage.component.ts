import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SondageData } from 'src/app/models/sondage-data';
import { RadioData } from 'src/app/models/radio-data';
import { FormGroup } from '@angular/forms';

interface buttonSatisfaction {
  number: number,
  active: boolean
}
@Component({
  selector: 'app-card-sondage',
  templateUrl: './card-sondage.component.html',
  styleUrls: ['./card-sondage.component.scss']
})
export class CardSondageComponent {
  @Input() formGroup!: FormGroup;
  @Output() satisfaction: EventEmitter<number> = new EventEmitter<number>();


  quest1: SondageData = {
    numQuestion: "1",
    question: "Quel établissement fréquentez-vous actuellement ?",
    comment: "Indiquez votre établissement",
    inputText: true,
    name: "etablissement"
  }
  quest2: SondageData = {
    numQuestion: "2",
    question: "Quel âge avez-vous ?",
    comment: "Indiquez votre âge",
    inputAge: true,
    name: "age"
  }
  quest3: SondageData = {
    numQuestion: "3",
    question: "Quel est votre code postal ?",
    comment: "Indiquez votre code postal",
    inputNumber: true,
    name: "codePostal"
  }
  quest4: SondageData = {
    numQuestion: "4",
    question: "Comment avez-vous pris connaissance de la JPO?",
    comment: "Une seule réponse possible",
    radio: true,
    name: "decouverte"
  }
  radio1: RadioData[] = [
    {
      rep: "Bouche à oreilles",
      value: "bouche_a_oreille",
      name: "decouverte"  
    },
    {
      rep: "Affiches",
      value: "affiches",
      name: "decouverte"  
    },
    {
      rep: "Réseaux sociaux",
      value: "reseaux_sociaux",
      name: "decouverte"  
    },
    {
      rep: "Recherches personnelles",
      value: "recherches_personnelles",
      name: "decouverte"  
    },
    {
      rep: "Autre",
      value: "autre",
      name: "decouverte"  
    }
  ]
  quest5: SondageData = {
    numQuestion: "5",
    question: "Quel(s) domaine(s) vous attirent le plus ?",
    comment: "Plusieurs réponses possibles",
    checkbox: true,
    name: "favorite_domain"
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
  quest6: SondageData = {
    numQuestion: "6",
    question: "De quel baccalauréat êtes-vous diplômés ?",
    comment: "Une seule réponse possible",
    radio: true,
    name: "bac"
  }
  radio2: RadioData[] = [
    {
      rep: "Baccalauréat Général",
      value: "general",
      name: "bac"  
    },
    {
      rep: "Baccalauréat Technologique",
      value: "technologique",
      name: "bac"  
    },
    {
      rep: "Baccalauréat Professionnel",
      value: "professionnel",
      name: "bac"  
    }
  ]
  quest7: SondageData = {
    numQuestion: "7",
    question: "Comment vous rendez-vous à l’IUT de Meaux ?",
    comment: "Plusieurs réponses possibles",
    checkbox: true,
    name: "transport_type"
  }
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
  quest8: SondageData = {
    numQuestion: "8",
    question: "Combien de temps mettez-vous pour vous rendre à l’IUT ?",
    comment: "Une seule réponse possible",
    radio: true,
    name: "transport_time"
  }
  radio3: RadioData[] = [
    {
      rep: "Moins de 30 min",
      value: "<30",
      name: "transport_time"  
    },
    {
      rep: "Entre 30 et 45 min",
      value: "30-45",
      name: "transport_time"  
    },
    {
      rep: "Entre 45 min et 1h30",
      value: "45-90",
      name: "transport_time"  
    },
    {
      rep: "Plus de 1h30",
      value: ">90",
      name: "transport_time"  
    }
  ]
  quest9: SondageData = {
    numQuestion: "9",
    question: "Quelles sont les autres écoles susceptibles de vous intéresser ?",
    comment: "Indiquez les différentes écoles",
    textArea: true,
    name: "schools"
  }
  quest10: SondageData = {
    numQuestion: "10",
    question: "Sur une échelle de 1 à 5, à combien évaluerez-vous la JPO?",
    comment: "Sélectionnez un chiffre",
    eval: true,
    name: "satisfaction"
  }
  satisfactionButtons: buttonSatisfaction[] = [
    {
      number: 1,
      active: false
    },
    {
      number: 2,
      active: false
    },
    {
      number: 3,
      active: false
    },
    {
      number: 4,
      active: false
    },
    {
      number: 5,
      active: false
    }
  ]

  sondageData: SondageData[] = [this.quest1, this.quest2, this.quest3, this.quest4, this.quest5, this.quest6, this.quest7, this.quest8, this.quest9, this.quest10];
  radioData: RadioData[][] = [this.radio1, this.radio2, this.radio3];
  checkboxData: RadioData[][] = [this.checkbox1, this.checkbox2];

  emitSatisfaction(satisfaction: number){
    this.satisfactionButtons.forEach(button => button.active = false);
    this.satisfaction.emit(satisfaction);
    this.satisfactionButtons[satisfaction-1].active = true;
  }
}