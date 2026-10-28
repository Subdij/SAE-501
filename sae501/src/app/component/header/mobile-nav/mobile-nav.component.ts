import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuService } from '../../../service/menu.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  @Input() isMenuOpen?: boolean;
  @Output() closeMenu = new EventEmitter<void>();
  isAdmin: boolean | undefined = undefined;
  isAuthenticated: boolean | undefined = undefined;

  constructor(private menuService: MenuService, protected authentication: AuthenticationService) {}

  onCloseMenu() {
    this.closeMenu.emit();
  }

  ngOnInit(): void {
    this.authentication.getIsAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authentication.getIsAdmin$().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
