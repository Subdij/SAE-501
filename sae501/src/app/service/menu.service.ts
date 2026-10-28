import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isMenuOpen = false;
  isHeaderVisible = true;

  constructor(private router: Router) {
    router.events.subscribe((event: Event) =>{
      if (event instanceof NavigationStart){
        if (this.isMenuOpen == true){
          this.toggleMenu();
        }
      }
    })
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isHeaderVisible = !this.isHeaderVisible;
  }
}