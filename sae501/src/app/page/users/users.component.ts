import { Component } from '@angular/core';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private popupService: PopupService) {}
}
