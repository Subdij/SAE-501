import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private isAlreadyFilled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getAll(): Observable<any>{
    return this.httpClient.get("https://sae501.alwaysdata.net/api/quiz/getAll.php", this.httpOptions);
  }

  isAlreadyFilled(){
    if(!localStorage.getItem("mail")) return;
    const mail = localStorage.getItem("mail");
    this.httpClient.get(`https://sae501.alwaysdata.net/api/quiz/get.php?mail=${mail}`, this.httpOptions).subscribe(
      (response) => {
        this.isAlreadyFilled$.next(true);
      },
      (error) => {
        this.isAlreadyFilled$.next(false);
      }
    );
  }

  getIsAlreadyFilled$(){
    return this.isAlreadyFilled$.asObservable();
  }

  addResponse(response: any): Observable<any>{
    const url = "https://sae501.alwaysdata.net/api/quiz/add.php";
    return this.httpClient.post(url, response, this.httpOptions);
  }
}