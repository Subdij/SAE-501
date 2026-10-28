import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  constructor(private httpClient: HttpClient) {}

  // errors: MessageError[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<any>{
    return this.httpClient.get("https://sae501.alwaysdata.net/api/contact/get_all.php", this.httpOptions);
  }
  
  deleteUser(id: number): Observable<any>{
    const url = `https://sae501.alwaysdata.net/api/contact/delete.php?id=${id}`;
    return this.httpClient.get(url, this.httpOptions);
  }

  addUser(addUser: any): Observable<any>{
    const url = 'https://sae501.alwaysdata.net/api/contact/create.php';
    return this.httpClient.post(url, addUser, this.httpOptions);
  }

  getUserById(id: number): Observable<any>{
    const url = `https://sae501.alwaysdata.net/api/contact/get_one.php?id=${id}`;
    return this.httpClient.get(url, this.httpOptions);
  }

  editUser(editUser: any): Observable<any>{
    const url = 'https://sae501.alwaysdata.net/api/contact/update.php';
    return this.httpClient.post(url, editUser, this.httpOptions);
  }
}