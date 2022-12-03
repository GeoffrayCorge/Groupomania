import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  link = 'http://localhost:3000/api/user/';


  constructor(private auth: AuthService) { }

  user: any = {};
  loggedUserId: any;
  @Input() userProfile: User = new User();
  file: any = undefined
  inputLastName: any
  inputFirstName: any
  inputPicture: any
  

  ngOnInit() {
    this.loggedUserId = sessionStorage.getItem('userId');
    console.log(this.loggedUserId);
    
    this.auth.getUser(this.loggedUserId).subscribe((data) => {
      this.user = data;
      console.log(this.user);

  })
  
  }
 
  modify(credentials: any) {

    if (this.inputFirstName == null && this.inputLastName == null) {
      console.log('rien à modifier');
      return
    }
    if (this.inputFirstName !== null && this.inputLastName === null) {
      this.auth.modifyUser(this.inputFirstName).subscribe(data => {
        window.location.reload()   
      })
    }
    if (this.inputFirstName === null && this.inputLastName !== null) {
      this.auth.modifyUser(this.inputLastName).subscribe(data => {
        window.location.reload()   
      })
    }
    else
    this.auth.modifyUser(credentials).subscribe(data => {
        window.location.reload()   
      })
  }

  addFile(event: any){
    this.file = event.target.files[0]
    console.log(this.file); 
    
  }

}
