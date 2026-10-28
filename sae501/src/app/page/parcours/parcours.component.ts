import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoomCard } from 'src/app/models/room-card-data';
import { Warning } from 'src/app/models/warning-data';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ParcoursService } from 'src/app/service/parcours.service';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss'],
})
export class ParcoursComponent implements OnInit {
  constructor(
    protected parcoursService: ParcoursService,
    private cdr: ChangeDetectorRef,
    private authentication: AuthenticationService,
  ){}
  warningData: Warning = {
    textOrdi: "Attention ! Veuillez noter que les salles seront fermées de 10h30 à 11h30  et de 14h30 à 15h30. Si vous êtes en pleine visite, vous serez redirigés par le personnel de l’établissement vers les amphithéâtre où auront lieu une présentation complète de l’IUT. Durant toute la durée de la présentation, aucune salle ne sera accessible.",
    textPhone: "Les salles seront fermées de 10h30 à 11h30 et de 14h30 à 15h30. Durant ces heures, vous serez diriger vers les amphithéâtres pour une présentation de l’IUT."
  };

  room133: RoomCard = {
    salle: "Salle 133",
    description: "Une salle dédiée au développement web avec Visual Studio Code.",
    image: "assets/images/parcours/salle_133.png",
    onClick: () => {
      const rooms = this.parcoursService.rooms$.getValue();
      rooms.push("Salle 133");
      this.parcoursService.rooms$.next(rooms);  
    }
  }

  room212: RoomCard = {
    salle: "Salle 212",
    description: "Une salle dédiée à la réalité virtuelle et à la création de jeu vidéo sur Unity.",
    image: "assets/images/parcours/salle_212.png",
    onClick: () => {
      const rooms = this.parcoursService.rooms$.getValue();
      rooms.push("Salle 212");
      this.parcoursService.rooms$.next(rooms);  
    }
  }

  room311: RoomCard = {
    salle: "Salle 311",
    description: "Une salle dédiée à l’art et au graphisme avec des logiciels de la suite Adobe.",
    image: "assets/images/parcours/salle_311.png",
    onClick: () => {
      const rooms = this.parcoursService.rooms$.getValue();
      rooms.push("Salle 311");
      this.parcoursService.rooms$.next(rooms);  
    }
  }

  room317: RoomCard = {
    salle: "Salle 317",
    description: "Une salle dédiée à la modélisation 3D avec Blender, Maya ou 3DS Max.",
    image: "assets/images/parcours/salle_317.png",
    onClick: () => {
      const rooms = this.parcoursService.rooms$.getValue();
      rooms.push("Salle 317");
      this.parcoursService.rooms$.next(rooms);  
    }
  }

  studio: RoomCard = {
    salle: "Studio",
    description: "Une double salle permettant le tournage de film avec fond vert et mixeur sonore.",
    image: "assets/images/parcours/studio.png",
    onClick: () => {
      const rooms = this.parcoursService.rooms$.getValue();
      rooms.push("Studio");
      this.parcoursService.rooms$.next(rooms);  
    }
  }

  ngOnInit(): void {
    this.authentication.redirectIfNotAuthenticated();
    this.parcoursService.getRooms().subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  resetParcours(){
    this.parcoursService.rooms$.next([]);
    this.parcoursService.saveParcours();
  }
}
