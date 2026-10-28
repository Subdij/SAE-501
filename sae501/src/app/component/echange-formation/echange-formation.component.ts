import { Component } from '@angular/core';

@Component({
  selector: 'app-echange-formation',
  templateUrl: './echange-formation.component.html',
  styleUrls: ['./echange-formation.component.scss']
})
export class EchangeFormationComponent {
  datas = [
    {
      title: 'Formation court de premier cycle en Arts :',
      description: 'Arts numériques, arts visuels, cinéma & vidéo, théatre. Accès à un laboratoire en arts numériques, studio d’expérimentation sonore, studio de tournage, salles de montage et laboratoire informatique en arts.',
      color: '#2F2A85'
    },
    {
      title: 'Formation court de premier cycle en Informatique :',
      description: 'Approfondissement des connaissances en informatique et programmation web et mobile. Accès à des laboratoires de fine pointe. Programme d’études en jeux-vidéo unique en premier cycle au Québec.',
      color: '#2F2A85'
    }
  ];
}
