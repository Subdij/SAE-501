import { Component, Input } from '@angular/core';
import { Warning } from 'src/app/models/warning-data';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent {
  @Input() warningData?: Warning;
}
