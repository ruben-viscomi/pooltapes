import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  showMenu: boolean = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  canShow(): boolean {
    return !this.router.isActive('/video', false);
  }

}
