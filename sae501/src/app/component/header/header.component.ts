import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean | undefined = undefined;
  isAuthenticated: boolean | undefined = undefined;
  name?: string;
  constructor(protected menuService: MenuService, protected authentication: AuthenticationService) {}

  get isMenuOpen() {
    return this.menuService.isMenuOpen;
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  closeMenu() {
    this.menuService.toggleMenu();
  }

  ngOnInit(): void {
    this.authentication.getIsAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authentication.getIsAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authentication.setName();

    this.authentication.getName$().subscribe((name) => {
      this.name = name ?? undefined;
    })

    this.authentication.isAuthenticated();
    this.authentication.isAdmin();
  }
}
