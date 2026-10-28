import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MobileNavComponent } from './component/header/mobile-nav/mobile-nav.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { CoverComponentComponent } from './component/cover/cover.component';
import { CardComponent } from './component/card/card.component';
import { LocalisationComponent } from './component/localisation/localisation.component';
import { FooterComponent } from './component/footer/footer.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { SignUpFormComponent } from './component/sign-up-form/sign-up-form.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { VisiteVirtuelleComponent } from './page/visite-virtuelle/visite-virtuelle.component';
import { SondageComponent } from './page/sondage/sondage.component';
import { CardSondageComponent } from './component/card-sondage/card-sondage.component';
import { DeletePopupComponent } from './component/delete-popup/delete-popup.component';
import { AddPopupComponent } from './component/add-popup/add-popup.component';
import { TestComponent } from './component/test/test.component';
import { UsersComponent } from './page/users/users.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectComponent } from './page/project/project.component';
import { FormErrorComponent } from './component/form-error/form-error.component';
import { AdminMenuComponent } from './component/admin-menu/admin-menu.component';
import { AdministrationComponent } from './page/administration/administration.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { PhonePipe } from './pipe/phone.pipe';
import { SondageDetailsComponent } from './component/sondage-details/sondage-details.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { DecodeHtmlStringPipe } from './pipe/decode-html-string.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { StatistiqueComponent } from './page/statistique/statistique.component';
import { MainStatisticsComponent } from './component/main-statistics/main-statistics.component';
import { CardGraphComponent } from './component/card-graph/card-graph.component';
import { TransformArrayPipe } from './pipe/transform-array.pipe';

import { FormationComponent } from './page/formation/formation.component';
import { BanniereFormationComponent } from './component/banniere-formation/banniere-formation.component';
import { OrganisationFormationComponent } from './component/organisation-formation/organisation-formation.component';
import { UeFormationComponent } from './component/ue-formation/ue-formation.component';
import { EchangeFormationComponent } from './component/echange-formation/echange-formation.component';
import { EchangeExplanationFormationComponent } from './component/echange-explanation-formation/echange-explanation-formation.component';
import { EcoleFormationComponent } from './component/ecole-formation/ecole-formation.component';
import { EcoleCardFormationComponent } from './component/ecole-card-formation/ecole-card-formation.component';
import { InsertionFormationComponent } from './component/insertion-formation/insertion-formation.component';
import { InsertionCardFormationComponent } from './component/insertion-card-formation/insertion-card-formation.component';
import { ProjetsFormationComponent } from './component/projets-formation/projets-formation.component';
import { ProjetsCardFormationComponent } from './component/projets-card-formation/projets-card-formation.component';
import { FriseComponent } from './component/frise/frise.component';
import { ParcoursComponent } from './page/parcours/parcours.component';
import { WarningComponent } from './component/warning/warning.component';
import { RoomCardComponent } from './component/room-card/room-card.component';
import { ParcoursTrackComponent } from './component/parcours-track/parcours-track.component';
import { SurveyCompletedComponent } from './component/survey-completed/survey-completed.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MobileNavComponent,
    AccueilComponent,
    CoverComponentComponent,
    CardComponent,
    LocalisationComponent,
    FooterComponent,
    InscriptionComponent,
    SignUpFormComponent,
    ConnexionComponent,
    LoginFormComponent,
    VisiteVirtuelleComponent,
    SondageComponent,
    CardSondageComponent,
    DeletePopupComponent,
    AddPopupComponent,
    TestComponent,
    UsersComponent,
    FormErrorComponent,
    ParcoursComponent,
    WarningComponent,
    RoomCardComponent,
    ParcoursTrackComponent,
    AdminMenuComponent,
    AdministrationComponent,
    UserListComponent,
    AddUserComponent,
    PhonePipe,
    SondageDetailsComponent,
    TruncatePipe,
    ProjectListComponent,
    DecodeHtmlStringPipe,
    StatistiqueComponent,
    MainStatisticsComponent,
    CardGraphComponent,
    TransformArrayPipe,
    FormationComponent,
    BanniereFormationComponent,
    OrganisationFormationComponent,
    UeFormationComponent,
    EchangeFormationComponent,
    EchangeExplanationFormationComponent,
    EcoleFormationComponent,
    EcoleCardFormationComponent,
    InsertionFormationComponent,
    InsertionCardFormationComponent,
    ProjetsFormationComponent,
    ProjetsCardFormationComponent,
    FriseComponent,
    ProjectComponent,
    FormErrorComponent,
    ParcoursComponent,
    WarningComponent,
    RoomCardComponent,
    ParcoursTrackComponent,
    SurveyCompletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      enableHtml: true
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
