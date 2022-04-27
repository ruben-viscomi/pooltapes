import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { UserLoginDto } from '../../services/auth/auth.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(credentials: UserLoginDto): void {
    const { mail, password } = credentials;
    if (!mail || !password) return;
    this.auth.login(credentials);
    this.router.navigate(['']);
  }

}
