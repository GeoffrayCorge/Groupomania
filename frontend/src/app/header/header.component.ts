import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ProfilComponent } from '../socialNetwork/profil/profil.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedOption: string;

  constructor(public router: Router,
    private auth : AuthService,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
  }
  
  onLogout() {
    this.auth.logout();
  }

  openDialog() {
    this.dialog.open(ProfilComponent);
  }



}
