import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-client',
  templateUrl: './user-client.component.html',
  styleUrls: ['./user-client.component.css']
})
export class UserClientComponent implements OnInit {

  showMenu: boolean = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
