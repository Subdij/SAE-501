import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainStats } from 'src/app/models/main-stats';
import { SondageStatsService } from 'src/app/service/sondage-stats.service';

@Component({
  selector: 'app-main-statistics',
  templateUrl: './main-statistics.component.html',
  styleUrls: ['./main-statistics.component.scss']
})
export class MainStatisticsComponent implements OnInit {
  mainStats: MainStats[] = [];
  satisfaction: Observable<any> = of();

  averageScore: MainStats = {
    img: '../../../assets/images/icones/etoile.png',
    stat: 0,
    desc: 'Note moyenne de la JPO',
    isAverageScore: true
  };
  transportType: MainStats = {
    img: '../../../assets/images/icones/transport.png',
    stat: 0,
    desc: 'des utilisateurs viennent en transport',
    isAverageScore: false
  };
  nbResponse: MainStats = {
    img: '../../../assets/images/icones/reponse.png',
    stat: 0,
    desc: 'réponses au sondage',
    isAverageScore: false
  };  
  averageAge: MainStats = {
    img: '../../../assets/images/icones/age.png',
    stat: 0,
    desc: 'âge moyen des utilisateurs',
    isAverageScore: false
  };

  constructor(private sondageStatsService: SondageStatsService) {}

  ngOnInit() {
    this.mainStats.push(this.averageScore, this.transportType, this.nbResponse, this.averageAge);
    this.sondageStatsService.getStats("satisfaction").subscribe((response) => {
      this.averageScore.stat = response.moyenne.toFixed(2);
      this.nbResponse.stat = response.total;
    });

    this.sondageStatsService.getStats("age").subscribe((response) =>{
      this.averageAge.stat = response.moyenne.toFixed(2);
    });

    this.sondageStatsService.getStats("transport_type").subscribe((response) =>{
      this.transportType.stat = (response.percentage_most_used_transport).toFixed(2) + '%';
      this.transportType.desc = 'des utilisateurs viennent '+ (response.most_used_transport == 'pied' || 'velo_trotinette'?'à ':'en ') + (response.most_used_transport == 'velo_trotinette'?"vélo /trotinette": response.most_used_transport);
    });
  }
}