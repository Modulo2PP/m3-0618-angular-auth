import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  update(username, password, email, estatus, image ){

    this.sessionService.update(username, password, email, estatus, image).subscribe()
  }
}
