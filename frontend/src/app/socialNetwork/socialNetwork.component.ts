import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-network',
  templateUrl: './socialNetwork.component.html',
  styleUrls: ['./socialNetwork.component.scss']
})
export class SocialNetworkComponent implements OnInit {



  constructor(private router: Router,
  ) { }

  ngOnInit() {
  }


}
