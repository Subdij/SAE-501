import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './page/accueil/accueil.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { VisiteVirtuelleComponent } from './page/visite-virtuelle/visite-virtuelle.component';
import { SondageComponent } from './page/sondage/sondage.component';
import { AdministrationComponent } from './page/administration/administration.component';
import { UsersComponent } from './page/users/users.component';
import { SondageDetailsComponent } from './component/sondage-details/sondage-details.component';
import { StatistiqueComponent } from './page/statistique/statistique.component';
import { FormationComponent } from './page/formation/formation.component';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { ParcoursComponent } from './page/parcours/parcours.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: "full"},
  { path: 'accueil', component : AccueilComponent },
  { path: 'inscription', component : InscriptionComponent },
  { path: 'formation', component : FormationComponent },
  { path: 'connexion', component : ConnexionComponent},
  { path: 'visite', component : VisiteVirtuelleComponent},
  { path: 'sondage', component : SondageComponent},
  { path: 'parcours', component: ParcoursComponent },
  { path: 'administration', component : AdministrationComponent, children: [
    { path: '', redirectTo: 'statistiques', pathMatch: "full"},
    { path: 'statistiques', component: StatistiqueComponent },
    { path: 'utilisateur', component: UsersComponent},
    { path: 'details', component: SondageDetailsComponent},
    { path: 'projets', component: ProjectListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
