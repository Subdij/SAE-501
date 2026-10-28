import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller){}
  ngOnInit() {
    console.log(window.scrollX, window.scrollY);
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0,0);
    console.log(window.scrollX, window.scrollY);
  }
}