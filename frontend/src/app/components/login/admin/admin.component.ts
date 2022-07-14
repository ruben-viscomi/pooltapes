import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';

import { Roles } from '../../../models/roles.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.auth.isAuthAdmin.subscribe((role: number) => {
      if (role === Roles.CONTENT) this.router.navigate(['admin', 'content']);
    })
  }

  ngOnInit(): void {}

  onAdminAccess(credentials: any): void {
    this.auth.adminAccess(credentials);
  }

}
