import { Component } from '@angular/core';
import { SessionService } from '../services/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user;
  constructor(public sessionService:SessionService) {

    this.user = this.sessionService.user
    console.log(this.user)
  }

  logout(){
    this.sessionService.logout().subscribe();
  }
}
