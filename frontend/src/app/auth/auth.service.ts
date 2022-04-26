import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly serviceAddr: string = '127.0.0.1:3010';

  constructor(private readonly http: HttpClient) {}

  login(credentials: { mail: string, password: string }): void {
    this.http.post(`http://${this.serviceAddr}/users/login`, credentials).subscribe(
      (res: any) => console.log(res)
    );
  }

}
