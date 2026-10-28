import { Component, Inject } from '@angular/core';
import { PopupService } from 'src/app/service/popup.service';
import { GetUserService } from 'src/app/service/get-user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
  users: any[] = [];

  constructor(private popupService: PopupService, 
    private getUserService: GetUserService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    @Inject(MAT_DIALOG_DATA) public data2: { projectId: number}) {
    }

  closePopup() {
    this.popupService.closePopup();
  }

  deleteUser() {
    if (this.data.userId) {
      this.getUserService.deleteUser(this.data.userId).subscribe(() => {
        console.log(`Utilisateur avec l'id ${this.data.userId} supprimé.`);
        this.popupService.userDeleted.emit();
        this.closePopup();
      });
    }
  }

  deleteProject(){
    if (this.data2.projectId){
      this.projectService.deleteProject(this.data2.projectId).subscribe(() => {
        console.log(`Projet avec l'id ${this.data2.projectId} supprimé.`);
        this.popupService.projectDeleted.emit();
        this.closePopup();
      });
    }
  }
}