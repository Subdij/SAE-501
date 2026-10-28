import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ParcoursService } from 'src/app/service/parcours.service';

interface Dot{
  backgroundColor: string,
  leftPosition: number
}

interface Room{
  filled: boolean,
  leftPosition: number,
  label: string
}

@Component({
  selector: 'app-parcours-track',
  templateUrl: './parcours-track.component.html',
  styleUrls: ['./parcours-track.component.scss']
})

export class ParcoursTrackComponent implements OnInit {
  @Input() numberDot!: number;
  dots: Dot[] = [];
  rooms: ("Salle 133" | "Salle 212" | "Salle 311" | "Salle 317" | "Studio")[] = [];
  roomsToDisplay: Room[] = [];
  lineWidth: string = "0%";

  constructor(private parcoursService: ParcoursService){
  }

  ngOnInit(){
    this.parcoursService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      this.generateDots();
      this.getRoomsToDisplay();  
      this.lineWidth = this.getWidthFilledLine()+'%';
    });
    this.parcoursService.getParcours();
  }

  deleteRoom(roomIndex: number){
    const rooms = this.parcoursService.rooms$.getValue();
    console.log("rooms", rooms);
    rooms.splice(roomIndex, 1);
    console.log("rooms spliced", rooms);
    this.parcoursService.rooms$.next(rooms);
    this.getDotBackground();
    this.getWidthFilledLine();
    this.getRoomsToDisplay();
  }

  generateDots(){
    const steps = 100/(this.numberDot-1);
    let backgrounds = this.getDotBackground();
    this.dots.push({
      backgroundColor: backgrounds[0],
      leftPosition: 0
    });
    let position = 0;
    for(let i=1; i<this.numberDot; i++){
      position += steps;
      this.dots.push({
        backgroundColor: backgrounds[i],
        leftPosition: position
      });
    }
  }

  getDotBackground(): string[]{
    const background: ("#D9D9D9" | "#4F47DA")[] = [];
    for(let i=0; i<this.numberDot; i++){
      if(this.rooms[i]){
        background.push('#4F47DA');
      } else if(!this.rooms[i]){
        background.push('#D9D9D9');
      }
    }
    return background;
  }

  getWidthFilledLine(): number{
    const steps = 100/(this.numberDot-1);
    let firstIndexUnfilled = this.numberDot;
    for(let i=0; i<this.numberDot; i++){
      if(!this.rooms[i]){
        firstIndexUnfilled = i;
        break;
      }
    }
    let width = steps * (firstIndexUnfilled - 1);
    if(width === -25) return 0;
    return width;
  }

  getRoomsToDisplay(){
    this.roomsToDisplay = [];
    const steps = 100/(this.numberDot-1);
    let position = 0;
    for(let i=0; i<this.numberDot; i++){
      if(this.rooms[i]){
        this.roomsToDisplay.push({
          filled: true,
          leftPosition: position,
          label: this.rooms[i]
        });
      } else {
        this.roomsToDisplay.push({
          filled: false,
          leftPosition: position,
          label: "à définir"
        });
      }
      position+=steps;
    }
  }

  getPhoneLabel(label: string){
    return label.replace(/^Salle\s+/i, '');
  }
}
