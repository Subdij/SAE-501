import { Component, Input, OnInit } from '@angular/core';
import { MessageError } from './message-error';

interface styleError {
  backgroundColor: string,
  marginBottom: string
}
@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() errorMessages!: MessageError[];
  @Input() styleError?: styleError;
  @Input() stylePara?: string;
}
