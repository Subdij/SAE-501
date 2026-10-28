import { Component, OnInit, Input } from '@angular/core';
import { SondageStatsService } from 'src/app/service/sondage-stats.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  chartData: any[] = [];
  @Input() index!: number;
  questionTitle: string[] = ["Sources informations", "Domaine préféré", "Bac", "Moyen de transport", "Temps de transport"];

  constructor(private sondageStatsService: SondageStatsService) {}

  ngOnInit() {
    // Tableau d'observables dans l'ordre dans lequel je souhaite les recevoir
    const observables = [
      this.sondageStatsService.getStats('decouverte'),
      this.sondageStatsService.getStats('favorite_domain'),
      this.sondageStatsService.getStats('bac'),
      this.sondageStatsService.getStats('transport_type'),
      this.sondageStatsService.getStats('transport_time')
    ];

    // Créé un tableau contenant les résultats des observables dans l'ordre fourni
    forkJoin(observables)
      .pipe(
        mergeMap((results) => {
          // results est un tableau contenant les résultats dans l'ordre spécifié
          this.chartData = results;
          return of(results);
        })
      )
      .subscribe((data) => {
        console.log(this.chartData);
      });
  }
}