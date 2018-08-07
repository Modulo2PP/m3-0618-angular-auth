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
    this.createS.createDebt(this.sessionS.user["_id"], this.debtorId, this.selectedFavor.cost, this.groupId).subscribe(e =>{
        this.balanceHaberes()
      })
   
  }

  info(){
    console.log(this.groupId)
  }

  balanceHaberes(){
    this.buscarS.buscarBalanceHaberes(this.groupId, this.sessionS.user["_id"]).subscribe(data =>{
      this.haberes = data
      console.log(this.haberes)
    })


 
    }
  
  balanceDeudas(){
    this.buscarS.buscarBalanceDeudas(this.groupId, this.sessionS.user["_id"]).subscribe(data =>{

      console.log(this.deudas)
      this.deudas = data
 
    })
  }
}









      //   const actualMembers = this.group["members"].map(e =>{
      //   return e.username
      // })
      

      //  this.haberes = data.filter(e => {
      //   if(actualMembers.includes(e.deudor[0].username)){
      //     return e
      //   }
      // }) 


           /* const actualMembers = this.group["members"].map(e =>{
        return e.username
      })

      this.deudas = data.filter(e => {
        if(actualMembers.includes(e.acreedor[0].username)){
          return e
        }
      })
      
    })
     */