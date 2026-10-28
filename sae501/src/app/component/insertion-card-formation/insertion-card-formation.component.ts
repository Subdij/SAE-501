import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insertion-card-formation',
  templateUrl: './insertion-card-formation.component.html',
  styleUrls: ['./insertion-card-formation.component.scss']
})
export class InsertionCardFormationComponent {
  @Input()
  title!: string;
  @Input()
  image!: string;
  @Input()
  description!: Array<string>;
}
