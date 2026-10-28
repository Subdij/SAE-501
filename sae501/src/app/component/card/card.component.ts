import { Component, Input } from '@angular/core';
import { CardData } from 'src/app/models/card-data';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardData: CardData[] = [];

  info: CardData = {
    text: "Notre formation en BUT MMI offre un programme complet couvrant les aspects essentiels du multimédia, de l'informatique et de la communication. Venez explorer le contenu des cours et découvrir l’ensemble du programme.",
    imgSrc: "../../../assets/images/icones/diplome.png"
  }
  rencontre: CardData = {
    text: "Rencontrez nos enseignants et nos étudiants actuels. Posez-leur vos questions sur le contenu des cours, les projets étudiants et les opportunités professionnelles après l'obtention du diplôme. Certains enseignants sont également professionnels en dehors de l’IUT.",
    imgSrc: "../../../assets/images/icones/enseignant.png"
  }
  atelier: CardData = {
    text: "Assistez à des ateliers interactifs et des démonstrations pour avoir un aperçu concret de ce que vous pourrez réaliser en tant qu'étudiant en MMI. Découvrez les projets créatifs de nos étudiants en 1ère, 2ème et 3 années.",
    imgSrc: "../../../assets/images/icones/ateliers.png"
  }
  futur: CardData = {
    text: "Explorez les perspectives de carrière dans le domaine du multimédia et de l'Internet. Découvrez les différents métiers auxquels vous pourriez accéder après avoir obtenu votre diplôme en MMI.",
    imgSrc: "../../../assets/images/icones/multimedia.png"
  }

  ngOnInit(){
    this.cardData.push(this.info, this.rencontre, this.atelier, this.futur);
  }
}