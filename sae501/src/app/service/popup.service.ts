import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPopupComponent } from '../component/add-popup/add-popup.component';
import { DeletePopupComponent } from '../component/delete-popup/delete-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  userDeleted = new EventEmitter<void>();
  projectDeleted = new EventEmitter<void>();
  userAdded = new EventEmitter<void>();
  projectAdded = new EventEmitter<void>();
  userEdited = new EventEmitter<void>();
  projectEdited = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openAddPopup(){
    this.dialog.open(AddPopupComponent, {
      data: { type: "add" }
    });
  }
  openAddProjectPopup(){
    this.dialog.open(AddPopupComponent, {
      data: { type: "add", project: true }
    });
  }
  openDeletePopup(userId: number){
    this.dialog.open(DeletePopupComponent, {
      data: { userId }
    });
  }
  openDeleteProjectPopup(projectId: number){
    this.dialog.open(DeletePopupComponent, {
      data: { projectId }
    });
  }
  openEditPopup(userId: number){
    this.dialog.open(AddPopupComponent, {
      data : { type: "edit", userId }
    });
  }
  openEditProjectPopup(projectId: number){
    this.dialog.open(AddPopupComponent, {
      data: { type: "edit", project: true, projectId }
    });
  }
  closePopup(){
    this.dialog.closeAll();
  }
}
