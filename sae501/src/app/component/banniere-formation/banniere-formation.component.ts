import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banniere-formation',
  templateUrl: './banniere-formation.component.html',
  styleUrls: ['./banniere-formation.component.scss']
})
export class BanniereFormationComponent {
  
    constructor(private scroller: ViewportScroller) { }

    discover() {
      const element = document.getElementById('scrollToPosition');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
}
