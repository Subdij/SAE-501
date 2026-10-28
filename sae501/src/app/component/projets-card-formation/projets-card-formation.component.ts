import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projets-card-formation',
  templateUrl: './projets-card-formation.component.html',
  styleUrls: ['./projets-card-formation.component.scss']
})
export class ProjetsCardFormationComponent {
  @Input()
  title!: string;
  @Input()
  description!: string;
  @Input()
  image!: string;
  @Input()
  link!: string;
  @Input()
  author!: string;
  @Input()
  date!: string;

}
