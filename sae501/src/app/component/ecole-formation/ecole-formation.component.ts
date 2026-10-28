import { Component } from '@angular/core';

@Component({
  selector: 'app-ecole-formation',
  templateUrl: './ecole-formation.component.html',
  styleUrls: ['./ecole-formation.component.scss']
})
export class EcoleFormationComponent {
  datas = [
    {
      title: 'Informatique',
      image: '../../../assets/images/icones/informatique.png',
      links: [
        {
          title: 'Master Informatique',
          link: 'https://www.onisep.fr/ressources/univers-formation/formations/Post-bac/master-mention-informatique'
        },
        {
          title: 'IIM',
          link: 'https://www.iim.fr/'
        },
        {
          title: 'EPITECH',
          link: 'https://www.epitech.eu/'
        },
        {
          title: 'École 42',
          link: 'https://42.fr/'
        },
        {
          title: 'ESGI',
          link: 'https://www.esgi.fr/'
        },
        {
          title: 'IMAC',
          link: 'https://www.ingenieur-imac.fr/'
        }
      ]
    },
    {
      title: 'Webdesign & Graphisme',
      image: '../../../assets/images/icones/webdesign.png',
      links: [
        {
          title: 'Les Gobelins',
          link: 'https://www.gobelins.fr/'
        },
        {
          title: 'Master Design Graphic',
          link: 'https://www.masteretudes.fr/master/design-numerique'
        },
        {
          title: 'HETIC',
          link: 'https://www.hetic.net/'
        },
        {
          title: 'École Sup du Digital',
          link: 'https://ecole-du-digital.com/'
        },
        {
          title: 'MJM Graphic Design',
          link: 'https://www.mjm-design.com/'
        },
        {
          title: 'IMAC',
          link: 'https://www.ingenieur-imac.fr/'
        }
      ]
    },
    {
      title: 'Marketing Digital',
      image: '../../../assets/images/icones/marketing.png',
      links: [
        {
          title: 'Master Marketing Digital',
          link: 'https://www.u-pec.fr/fr/formation/master-marketing-vente-parcours-marketing-digital'
        },
        {
          title: 'École Sup du Digital',
          link: 'https://ecole-du-digital.com/'
        },
        {
          title: 'MJM Graphic Design',
          link: 'https://www.mjm-design.com/'
        },
        {
          title: 'IMAC',
          link: 'https://www.ingenieur-imac.fr/'
        },
        {
          title: 'Les Gobelins',
          link: 'https://www.gobelins.fr/'
        },
        {
          title: 'HETIC',
          link: 'https://www.hetic.net/'
        }
      ]
    }
  ];
}
