import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  link = 'http://localhost:3000/api/user/';
  userId = sessionStorage.getItem('userId');

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: any) {
    return this.http.post<{ userId: string, token: string, role: string }>(this.link + 'login', credentials)
  }

  signup(credentials: any) {
    return this.http.post<{ userId: string, token: string, role: string }>(this.link + 'signup', credentials)
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getUser(userId: String) {   
    return this.http.get(this.link + userId)
  }

  modifyUser(credentials: any) {
    return this.http.put(this.link + this.userId, credentials)
  }
}
