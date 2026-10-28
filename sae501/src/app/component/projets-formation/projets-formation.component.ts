import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-projets-formation',
  templateUrl: './projets-formation.component.html',
  styleUrls: ['./projets-formation.component.scss']
})
export class ProjetsFormationComponent implements OnInit{
  projects: any[] = [];
  showAllProjects: boolean = false;
  constructor(private projectService: ProjectService) {}

  getAll(){
    this.projectService.getAll().subscribe((project: any) => {
      this.projects = project;
      console.log(this.projects);
    })
  }

  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
  }

  ngOnInit(): void {
    this.getAll();
  }
}
