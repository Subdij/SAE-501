import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  // constructor(private httpClient: HttpClient){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   this.httpClient.get("http://192.168.105.39/SAE_501/SAE-501/api/projects/getAll.php", httpOptions).subscribe((value) => {
  //     console.log(value);
  //   });
  // }
}
