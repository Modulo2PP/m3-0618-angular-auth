import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;

  constructor( public sessionS: SessionService) { }

  ngOnInit() {
  
    this.user = this.sessionS.user.username
  }


  ver(){
   console.log(this.sessionS.user.username)
  }
}
