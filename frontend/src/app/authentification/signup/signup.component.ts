import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../authentification.component.scss']
})
export class SignupComponent implements OnInit {
   file : any=undefined;

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  signup(credentials: any) {
    console.log(credentials);

    const body= new FormData();
    body.append('firstName', credentials.firstName)
    body.append('lastName', credentials.lastName)
    body.append('email', credentials.email)
    body.append('password', credentials.password)
    body.append('picture', this.file)
    body.append('role', 'USER')

    this.auth.signup(body).subscribe(response => {
      const link = ['login'];
      const token = response.token;
      const userId = response.userId;
      const userRole = response.role
      
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem('role', userRole)
      sessionStorage.setItem("token", token);     

      alert ('Vous êtes bien inscrit, vous pouvez vous connecter !')
      this.router.navigate(link);
    })
  }
}
