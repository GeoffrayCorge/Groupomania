import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentification.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private auth: AuthService,
    ) { }

  ngOnInit() {
  }

  login(credentials: any) {
    this.auth.login(credentials).subscribe(response => {
      const link = ['posts'];
      const token = response.token;
      const userId = response.userId;
      const userRole = response.role
     
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem('role', userRole)
      sessionStorage.setItem("token", token);    
      
      this.router.navigate(link);
    },
    error => {
      alert('Identifiants incorrects');
    }
    )
  }
}
