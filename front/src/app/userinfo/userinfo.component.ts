import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { buscadorService } from '../../services/buscador.services';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  profileId;
  userInfo;
  groups;
  constructor(public route: ActivatedRoute, public buscarS: buscadorService) { }

  ngOnInit() {
    this.getProfile()
  }


  getProfile(){

    this.route.params.subscribe((params) => {
      this.profileId = params.id
      this.buscarS.getProfile(this.profileId).subscribe(e=>{
        this.userInfo = e
        this.getGroups()
      })
    })
  }

  getGroups(){
    this.buscarS.getGroups(this.profileId).subscribe(e=>{
      this.groups = e;
      console.log(this.groups)
    })

  }
}
