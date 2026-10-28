import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

interface DataRoom{
  "user": string,
  "133"?: number,
  "212"?: number,
  "311"?: number,
  "317"?: number,
  "studio"?: number
}
@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  rooms$ = new BehaviorSubject<("Salle 133" | "Salle 212" | "Salle 311" | "Salle 317" | "Studio")[]>([]);

  constructor(private httpClient: HttpClient, private toastr: ToastrService,) { }

  getRooms(): Observable<("Salle 133" | "Salle 212" | "Salle 311" | "Salle 317" | "Studio")[]>{
    this.setRooms(); //à suppr après
    return this.rooms$.asObservable();
  }

  setRooms(){
    this.rooms$.next(["Salle 311", "Salle 317", "Salle 212"]);
  }

  isRoomInRooms(room: "Salle 133" | "Salle 212" | "Salle 311" | "Salle 317" | "Studio"): boolean{
    if(this.rooms$.value.indexOf(room) !== -1){
      return false;
    }
    return true;
  }

  getParcours(){
      if(localStorage.getItem("mail")){
        const mail = localStorage.getItem("mail");
        this.httpClient.get(`https://sae501.alwaysdata.net/api/parcours/get_one.php?user=${mail}`, this.httpOptions).subscribe(
          (response: any) => {
            const rooms: ("Salle 133" | "Salle 212" | "Salle 311" | "Salle 317" | "Studio")[] = [];
            if(response[0]){
              delete response[0]['user'];
              const keys = Object.keys(response[0]);
              keys.sort((a, b) => response[0][a] - response[0][b]);
              const sortedArray = keys
                .filter((key) => response[0][key] !== null)
                .map((key) => ({ salle: key, value: response[0][key] }));    
              sortedArray.forEach((room) => {
                if(room.salle === "salle_133"){
                  rooms.push("Salle 133");
                }
                if(room.salle === "salle_212"){
                  rooms.push("Salle 212");
                }
                if(room.salle === "salle_311"){
                  rooms.push("Salle 311");
                }
                if(room.salle === "salle_317"){
                  rooms.push("Salle 317");
                }
                if(room.salle === "studio"){
                  rooms.push("Studio");
                }
              }); 
            }
            this.rooms$.next(rooms);
          },
          (error) => {
            console.error("échec de la requête", error);
            this.rooms$.next([]);
          }
        );
      } else {
        this.rooms$.next([]);
      }
  }  

  saveParcours(){
    if(!localStorage.getItem("mail")) return;
    const mail = localStorage.getItem("mail");
    this.httpClient.get(`https://sae501.alwaysdata.net/api/parcours/get_one.php?user=${mail}`, this.httpOptions).subscribe(
      (response: any) => {
        if(!response[0]){
          const data = this.roomsToDataRoom();
          console.log("data create", data);
          this.httpClient.post("https://sae501.alwaysdata.net/api/parcours/create.php", data, this.httpOptions).subscribe(
            (response) => {
              console.log(response);
              this.toastr.success('Parcours enregistré !');
            },
            (error) => {
              console.error(error);
              this.toastr.error("Echec de l'enregistrement");
            }
          );
        } else {
          const data = this.roomsToDataRoom();
          console.log("data update", data);
          this.httpClient.post("https://sae501.alwaysdata.net/api/parcours/update.php", data, this.httpOptions).subscribe(
            (response) => {
              console.log(response);
              this.toastr.success(`<img src="assets/images/icones/check.png"> Parcours modifié !`);
            },
            (error) => {
              console.error(error);
              this.toastr.error('Echec de la modification');
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  roomsToDataRoom(){
      const rooms = this.rooms$.value;
      const dataRoom: DataRoom = {
        "user": localStorage.getItem("mail") ?? ""
      }
      rooms.forEach((room, index) => {
        if(room === "Salle 133"){
          dataRoom['133'] = index+1;
        }
        if(room === "Salle 212"){
          dataRoom['212'] = index+1;
        }
        if(room === "Salle 311"){
          dataRoom['311'] = index+1;
        }
        if(room === "Salle 317"){
          dataRoom['317'] = index+1;
        }
        if(room === "Studio"){
          dataRoom['studio'] = index+1;
        }
      }); 
      return dataRoom; 
  }
}
