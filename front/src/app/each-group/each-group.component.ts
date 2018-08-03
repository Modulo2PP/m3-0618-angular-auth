import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { buscadorService } from '../../services/buscador.services';
import { createService } from '../../services/create.service';


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
  constructor(public route: ActivatedRoute, public buscarS : buscadorService, public createS: createService) {}

  ngOnInit() {
   this.getMyGroup()
 
  }


  getMyGroup(){
    this.route.params.subscribe((params) => {
      this.groupId = params.id
      this.buscarS.mygroup(this.groupId).subscribe(e =>{
        this.group = e
        console.log(this.group["favors"])
      })
    });

  }

  createFav(description, cost){
 
    this.createS.createFavor(description, cost, this.groupId).subscribe(e =>{
      this.newFavor = e
      console.log(this.newFavor);
      this.getMyGroup()
    });


  };

  selectFavor(favor){

    this.favors = this.group["favors"]

    this.selectedFavor =  this.favors.filter(i => i["description"] === favor)[0];

    console.log(this.selectedFavor)

  }
}
