import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private readonly auth: AuthService) { }

  ngOnInit(): void {
  }

  onAdminAccess(credentials: any): void {
    this.auth.adminAccess(credentials);
  }

}
