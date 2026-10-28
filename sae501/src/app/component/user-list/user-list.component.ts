import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/service/popup.service';
import { GetUserService } from 'src/app/service/get-user.service';
import { SorterData } from 'src/app/models/sorter-data';
import { ArraySorterService } from 'src/app/service/array-sorter.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  sorters: SorterData[] = [
    {
      title: "Email",
      active: true,
      up: true,
      key: "mail",
      sorter: true
    },
    {
      title: "Prénom",
      active: false,
      up: false,
      key: "first_name",
      sorter: true
    },
    {
      title: "Nom",
      active: false,
      up: false,
      key: "last_name",
      sorter: true
    },
    {
      title: "N° Tel.",
    },
    {
      title: "Actions",
    },

  ]

  constructor(private popupService: PopupService, private getUserService: GetUserService, protected arraySorter: ArraySorterService) {}

  openDeletePopup(userId: number) {
    this.popupService.openDeletePopup(userId);
    console.log(userId);
  }
  openEditPopup(userId: number) {
    this.popupService.openEditPopup(userId);
    console.log(userId);
  }
  getAll(){
    this.getUserService.getAll().subscribe((userData: any) => {
      this.users = userData;
      this.arraySorter.sortedArrayWithCurrentKeyAndOrder(this.users);
    });
  }
  ngOnInit(){
    this.arraySorter.setDefaultOrder();
    this.arraySorter.setDefaultActiveKey("mail");
    this.getAll();
    this.popupService.userDeleted.subscribe(() => {
      this.getAll();
    });
    this.popupService.userAdded.subscribe(() => {
      this.getAll();
    });
    this.popupService.userEdited.subscribe(() => {
      this.getAll();
    });
  }
}