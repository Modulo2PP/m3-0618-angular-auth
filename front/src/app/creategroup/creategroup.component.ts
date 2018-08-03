import { Component, OnInit } from '@angular/core';
import { buscadorService } from '../../services/buscador.services';
import { createService } from '../../services/create.service';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  data = this.buscadorS.data
  groupMembers:Array<object> = [this.sessionS.user]
  groupMembersIds:Array<string>

  constructor(public buscadorS : buscadorService, public createS : createService, public sessionS: SessionService) { }

  ngOnInit() {
  }


  buscador(pattern){
    if(pattern.length >= 3){
      this.buscadorS.buscar(pattern).subscribe(e =>{
        this.data = e
      })
    }
    if(pattern.length == 0){
      this.data = null
    }
  }

  add(user, pattern){
    this.groupMembers.push(user);
    this.groupMembersIds.push(user['id'])
  }


  remove(user){
    var index = this.groupMembers.indexOf(user);
    this.groupMembers.splice(index, 1)
  }

  createGroup(groupMembersIds:Array<string>, groupName){
    this.createS.createGroup(groupMembersIds, groupName).subscribe()
  }

}