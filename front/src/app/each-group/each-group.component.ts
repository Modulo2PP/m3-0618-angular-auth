import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { buscadorService } from '../../services/buscador.services';
import { createService } from '../../services/create.service';
import { SessionService } from '../../services/session';


@Component({
  selector: 'app-each-group',
  templateUrl: './each-group.component.html',
  styleUrls: ['./each-group.component.css']
})
export class EachGroupComponent implements OnInit {

  groupId;
  group:object;
  favors: Array<object> = []
  newFavor;
  selectedFavor:any = {
    cost:0
  }
  debtorId;

  constructor(public route: ActivatedRoute, public buscarS : buscadorService, public createS: createService, public sessionS: SessionService) {}

  ngOnInit() {
   this.getMyGroup()
 
  }


  getMyGroup(){
    this.route.params.subscribe((params) => {
      this.groupId = params.id
      this.buscarS.mygroup(this.groupId).subscribe(e =>{
        this.group = e
      })
    });

  }

  createFav(description, cost){
 
    this.createS.createFavor(description, cost, this.groupId).subscribe(e =>{
      this.newFavor = e
      this.getMyGroup()
    });


  };

  selectFavor(favor){

    this.favors = this.group["favors"]

    this.selectedFavor =  this.favors.filter(i => i["description"] === favor)[0];


  }


  makeFavor(debtor){

    this.debtorId = this.group["members"].filter(i => i["username"] === debtor)[0]._id    
    this.createS.createDebt(this.sessionS.user["_id"], this.debtorId, this.selectedFavor.cost).subscribe(e =>{
      this.buscarS.buscarDeuda(e["_id"]).subscribe(e =>{
        console.log(e)
      })
    })

  
  }
}
