import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ecole-card-formation',
  templateUrl: './ecole-card-formation.component.html',
  styleUrls: ['./ecole-card-formation.component.scss']
})
export class EcoleCardFormationComponent {
  @Input()
  title!: string;
  @Input()
  image!: string;
  @Input()
  links!: any[];
}
