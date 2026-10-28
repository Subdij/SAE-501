import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {}
  private data = {};

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<any>{
    return this.httpClient.get("https://sae501.alwaysdata.net/api/projects/getAll.php", this.httpOptions);
  }

  deleteProject(projectId: number): Observable<any>{
    const url = 'https://sae501.alwaysdata.net/api/projects/delete.php';
    this.data = {
      id: projectId
    };
    return this.httpClient.post(url, this.data, this.httpOptions);
  }

  addProject(addProject: FormData, image: File): Observable<any>{
    const url = "https://sae501.alwaysdata.net/api/projects/add.php";

    addProject.append('image', image);
    return this.httpClient.post(url, addProject);
  }

  getProjectById(projectId: number): Observable<any>{
    const url = "https://sae501.alwaysdata.net/api/projects/get.php";
    this.data = {
      id: projectId
    };
    return this.httpClient.post(url, this.data, this.httpOptions);
  }
  
  editProject(editProject: FormData, image?: File): Observable<any>{
    const url = "https://sae501.alwaysdata.net/api/projects/edit.php";

    if (image) {
        editProject.append('image', image);
    }
    return this.httpClient.post(url, editProject);
}

  numberRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const numberValue = Number(control.value);
      if (isNaN(numberValue)) {
        return {'notANumber': {value: control.value}};
      } else if (numberValue < min || numberValue > max) {
        return {'outOfRange': {value: control.value}};
      } else {
        return null;
      }
    };
  }
}