import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SondageStatsService {

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getStats(stat: any): Observable<any>{
    const url = `https://sae501.alwaysdata.net/api/quiz/stats.php?type=${stat}`;
    return this.httpClient.get(url, this.httpOptions);
  }
}
