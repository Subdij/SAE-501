import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user-data';
import { MessageError } from '../component/form-error/message-error';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  errors: MessageError[] = [];
  private errors$ = new BehaviorSubject<MessageError[]>([]);
  private isAuthenticated$ = new BehaviorSubject<boolean | undefined>(undefined);
  private isAdmin$ = new BehaviorSubject<boolean | undefined>(undefined);
  private name$ = new BehaviorSubject<string | null>(null);

  //Lien avec l'API
  isAuthenticated() {
    if(localStorage.getItem("token") && localStorage.getItem("mail")){
      const mail = localStorage.getItem("mail");
      const token = localStorage.getItem("token");
      this.httpClient.get(`https://sae501.alwaysdata.net/api/is_token_valid.php?mail=${mail}&token=${token}`).subscribe(
        (response: any) => {
          this.isAuthenticated$.next(response.token);
        },
        (error: HttpErrorResponse) => {
          console.error("échec de la requête", error)
          this.isAuthenticated$.next(false);
        }
      );
    } else {
      this.isAuthenticated$.next(false);
    }
  }

  logIn(user: User){
    const data = {
      "mail": user.email,
      "password": user.password
    }
    this.errors$.next([]);
    this.errors = [];
    this.httpClient.post("https://sae501.alwaysdata.net/api/login.php", data, this.httpOptions).subscribe(
      (response: any) => {
        console.log("response", response);
        localStorage.setItem('token', response.token.replace(/"/g, ''));
        localStorage.setItem('mail', response.mail.replace(/"/g, ''));
        localStorage.setItem('firstName', response.first_name.replace(/"/g, ''));
        localStorage.setItem('status', response.status.replace(/"/g, ''));
        this.setName();
        this.isAuthenticated();
        this.isAdmin();    
        this.router.navigateByUrl('/accueil');
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        for(let messageError of error.error){
          const message : MessageError = {
            condition: () => true,
            message: messageError
          };
          this.errors.push(message);
        }
        this.errors$.next(this.errors);
        console.log("errors$", this.errors$.value);
      }
    );
  }

  registration(user: User) {
    const data = {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "mail": user.email,
      "phone": user.phone,
      "password": user.password
    }
    this.errors$.next([]);
    this.errors = [];
    this.httpClient.post("https://sae501.alwaysdata.net/api/registration.php", data, this.httpOptions).subscribe(
      (response: any) => {
        console.log("response", response);
        localStorage.setItem('token', response.token.replace(/"/g, ''));
        localStorage.setItem('mail', response.mail.replace(/"/g, ''));
        localStorage.setItem('firstName', response.first_name.replace(/"/g, ''));
        localStorage.setItem('status', response.status.replace(/"/g, ''));
        this.setName();
        this.isAuthenticated();
        this.isAdmin();    
        this.router.navigateByUrl('/accueil');
        this.errors$.next(this.errors);
      },
      (error: HttpErrorResponse) => {
        for(let messageError of error.error){
          const message : MessageError = {
            condition: () => true,
            message: messageError
          };
          this.errors.push(message);
          this.errors$.next(this.errors);
        }
      }
    );
  }

  //Status
  isAdmin() {
    if (this.isAuthenticated$) {
      if (localStorage.getItem("status") === "admin") {
        this.isAdmin$.next(true);
      } else {
        this.isAdmin$.next(false);
      }
    } else {
      this.isAdmin$.next(false);
    }
  }
  getIsAdmin$(){
    return this.isAdmin$.asObservable();
  }
  getIsAuthenticated$() {
    return this.isAuthenticated$.asObservable();
  }

  //Name
  setName(){
    this.name$.next(localStorage.getItem("firstName"));
  }
  getName$(){
    return this.name$.asObservable();
  }

  //Errors
  getErrors$() {
    return this.errors$.asObservable();
  }
  isAtLeastOneError(errors: MessageError[]): boolean{
    let isOneError = false;
    for(let error of errors){
      if(error.condition() === true){
        isOneError = true;
      }
    }
    return isOneError;
  }

  //Redirection
  logOut(){
    localStorage.clear();
    this.isAuthenticated();
    this.isAdmin();
    this.router.navigateByUrl('/accueil');
  }
  redirectIfNotAuthenticated(){
    this.getIsAuthenticated$().subscribe((isAuthenticated) => {
      if(isAuthenticated === false){
        this.router.navigateByUrl('/connexion');
      }
    })
  }
  redirectIfNotAdmin(){
    this.getIsAdmin$().subscribe((isAdmin) => {
      if(isAdmin === false){
        this.router.navigateByUrl('/connexion');
      }
    })
  }

}
