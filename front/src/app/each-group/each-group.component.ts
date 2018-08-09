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
  groupPopulated
  favors: Array<object> = []
  newFavor;
  selectedFavor:any = {
    cost:0
  }
  debtorId;
  haberes;
  deudas;
  groupMembers = []
  info:any;
  
  constructor(public route: ActivatedRoute, public buscarS : buscadorService, public createS: createService, public sessionS: SessionService) {}

  ngOnInit() {
    this.getMyGroup()
    
  //  this.balanceHaberes()
 
  }


  getMyGroup(){

    this.route.params.subscribe((params) => {
      this.groupId = params.id
      this.buscarS.mygroup(this.groupId).subscribe(e =>{
        this.group = e
        this.balanceDeudas()
        this.balanceHaberes()
      })
    });
  }

  createFav(description, cost){
    
    this.createS.createFavor(description, cost, this.groupId).subscribe(e =>{
      this.getMyGroup()
      this.newFavor = e
    });


  };

  selectFavor(favor){
    this.favors = this.group["favors"]
    this.selectedFavor =  this.favors.filter(i => i["description"] === favor)[0];
  }


  makeFavor(debtor){
    this.debtorId = this.group["members"].filter(i => i["username"] === debtor)[0]._id    
    this.createS.createDebt(this.sessionS.user["_id"], this.debtorId, this.selectedFavor.cost, this.groupId).subscribe(()  =>{
        this.balanceHaberes();
        this.balanceDeudas();
      })
   
  }

  balanceHaberes(){
    this.buscarS.buscarBalanceHaberes(this.groupId, this.sessionS.user["_id"]).subscribe(data =>{
      console.log("hola")
      this.haberes = data
    })


 
    }
  
  balanceDeudas(){
    this.buscarS.buscarBalanceDeudas(this.groupId, this.sessionS.user["_id"]).subscribe(data =>{
      console.log("esta entrabdo en el balance deudas")
      console.log(data)
      this.deudas = data
 
    })
  }
}