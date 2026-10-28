import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-echange-explanation-formation',
  templateUrl: './echange-explanation-formation.component.html',
  styleUrls: ['./echange-explanation-formation.component.scss']
})
export class EchangeExplanationFormationComponent {
  @Input()
  sideColor!: string;
  @Input()
  title!: string;
  @Input()
  description!: string;

}
