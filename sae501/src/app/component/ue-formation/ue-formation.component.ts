import { Component} from '@angular/core';

@Component({
  selector: 'app-ue-formation',
  templateUrl: './ue-formation.component.html',
  styleUrls: ['./ue-formation.component.scss']
})
export class UeFormationComponent{
  data = [
    {
      title: 'Comprendre',
      color: '#FF9F9F',
      ressources: [
        {
          title: 'R103',
          desc: 'Ergonomie et Accessibilité'
        },
        {
          title: 'R104',
          desc: 'Culture Numérique'
        },
        {
          title: 'R105',
          desc: 'Stratégie de Communication'
        },
        {
          title: 'R118',
          desc: 'Économie et Droit du Numérique'
        }
      ]
    },
    {
      title: 'Concevoir',
      color: '#FF9c72',
      ressources: [
        {
          title: 'R102',
          desc: 'Anglais pour le Web'
        },
        {
          title: 'R105',
          desc: 'Stragégie de Communication'
        },
        {
          title: 'R106',
          desc: 'Expression, Communication et Rhétorique'
        }
      ]
    },
    {
      title: 'Exprimer',
      color: '#F0E47B',
      ressources: [
        {
          title: 'R101',
          desc: 'Anglais'
        },
        {
          title: 'R107',
          desc: 'Écriture Multimédia et Narration'
        },
        {
          title: 'R108',
          desc: 'Production graphique'
        },
        {
          title: 'R109',
          desc: 'Culture Artistique'
        },
        {
          title: 'R110',
          desc: 'Production Audio & Vidéo'
        },
        {
          title: 'R116',
          desc: 'Représentation et traitement de l\'information'
        }
      ]
    },
    {
      title: 'Développer',
      color: '#59D775',
      ressources: [
        {
          title: 'R112',
          desc: 'Intégration'
        },
        {
          title: 'R113',
          desc: 'Développement Web'
        },
        {
          title: 'R115',
          desc: 'Hébergement'
        },
        {
          title: 'R214',
          desc: 'Système d\'information'
        },
        {
          title: 'R211',
          desc: 'Gestion de Contenu'
        }
      ]
    },
    {
      title: 'Entreprendre',
      color: '#87A1FF',
      ressources: [
        {
          title: 'R217',
          desc: 'Gestion de projet'
        },
        {
          title: 'R218',
          desc: 'Économie et droit du Numérique'
        },
        {
          title: 'R219',
          desc: 'PPP'
        }
      ]
    }
  ];

}
