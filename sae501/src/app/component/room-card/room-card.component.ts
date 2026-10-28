import { Component, Input } from '@angular/core';
import { RoomCard } from 'src/app/models/room-card-data';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent {
  @Input() roomCardData?: RoomCard;
}
