import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { SorterData } from 'src/app/models/sorter-data';
import { ArraySorterService } from 'src/app/service/array-sorter.service';
import { PopupService } from 'src/app/service/popup.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit{

  projects: any[] = [];
  sorters: SorterData[] = [
    {
      title: "Titre",
      active: true,
      up: true,
      key: "title",
      sorter: true
    },
    {
      title: "Miniature",
    },
    {
      title: "Description",
    },
    {
      title: "Auteur",
      active: false,
      up: false,
      key: "author",
      sorter: true
    },
    {
      title: "Année",
      active: false,
      up: false,
      key: "study_year",
      sorter: true
    },
    {
      title: "Date",
      active: false,
      up: false,
      key: "date",
      sorter: true
    },
    {
      title: "Lien",
    },
    {
      title: "Action",
    },
  ]
  constructor(private popupService: PopupService, private projectService: ProjectService, protected arraySorter: ArraySorterService) {}

  openDeletePopup(projectId: number){
    this.popupService.openDeleteProjectPopup(projectId);
  }
  openEditPopup(projectId: number){
    this.popupService.openEditProjectPopup(projectId);
  }
  openAddPopup(){
    this.popupService.openAddProjectPopup();
  }
  getAll(){
    this.projectService.getAll().subscribe((project: any) => {
      this.projects = project;
      this.arraySorter.sortedArrayWithCurrentKeyAndOrder(this.projects);
    })
  }
  ngOnInit(): void {
    this.arraySorter.setDefaultOrder();
    this.arraySorter.setDefaultActiveKey("title");
    this.getAll();
    this.popupService.projectDeleted.subscribe(() => {
      this.getAll();
    });
    this.popupService.projectAdded.subscribe(() => {
      this.getAll();
    });
    this.popupService.projectEdited.subscribe(() => {
      this.getAll();
    })
  }
}
