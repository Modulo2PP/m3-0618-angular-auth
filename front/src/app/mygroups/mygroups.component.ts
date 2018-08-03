import { Component, OnInit } from '@angular/core';
import { buscadorService } from '../../services/buscador.services';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mygroups',
  templateUrl: './mygroups.component.html',
  styleUrls: ['./mygroups.component.css']
})
export class MygroupsComponent implements OnInit {

  allgroups;
  mygroups;
  id = this.sessionService.user["_id"]
  constructor(public buscadorS : buscadorService, public sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  
    this.buscadorS.buscarGrupos(this.id).subscribe(e  =>{
      this.mygroups = e
    })

  }
  

}
