import { Component } from '@angular/core';

@Component({
  selector: 'app-insertion-formation',
  templateUrl: './insertion-formation.component.html',
  styleUrls: ['./insertion-formation.component.scss']
})
export class InsertionFormationComponent {
  datas = [
    {
      title: 'Développeur Web',
      image: '../../../assets/images/dev-web.jpg',
      description: ['Conception et développement de sites web', 'Gestion de bases de données', 'Intégration de fonctionnalités']
    },
    {
      title: 'Webdesigner UI/UX',
      image: '../../../assets/images/web_designer_ux.png',
      description: ['Création d\'interfaces utilisateur attractives', 'Maquettage de site web', 'Définition de parcours utilisateurs', 'Réflexion sur l\'accessibilité']
    },
    {
      title: 'Infographiste',
      image: '../../../assets/images/infographiste.avif',
      description: ['Création et retouche d\'images', 'Conception graphique', 'Réalisation d\'illustrations', 'Création d\'animations']
    },
    {
      title: 'Chef de projet digital',
      image: '../../../assets/images/chef_de_projet.jpg',
      description: ['Gestion de projets multimédias', 'Coordination des équipes', 'Communication avec les cliens', 'Suivi des délais et budgets']
    },
    {
      title: 'Community Manager',
      image: '../../../assets/images/community-manager.jpeg',
      description: ['Communication sur Internet', 'Maîtrise des réseaux sociaux', 'Gestion de communautés', 'Référencement des moteurs de recherche']
    },
    {
      title: 'Analyse de données',
      image: '../../../assets/images/analyst.jpeg',
      description: ['Traitement de l\'information', 'Manipuler des données à l\'aide de logiciel d\'analyse (Excel, SQL, etc...)', 'Compréhension de l\'expérience utilisateur']
    }
  ];
}
