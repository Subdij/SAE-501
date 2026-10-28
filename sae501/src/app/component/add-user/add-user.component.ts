import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent{
  constructor(private popupService: PopupService) {}

  openAddPopup(){
    this.popupService.openAddPopup();
  }
  openAddProjectPopup(){
    this.popupService.openAddProjectPopup();
  }
}