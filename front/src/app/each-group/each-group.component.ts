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
  group:Array<any>;
  favors: Array<object> = []
  newFavor;
  selectedFavor;
  constructor(public route: ActivatedRoute, public buscarS : buscadorService, public createS: createService) {}

  ngOnInit() {
   
    this.route.params.subscribe((params) => this.groupId = params.id);
    this.buscarS.mygroup(this.groupId).subscribe(e =>{
      this.group = e
    })

  }

  bruno(){
    console.log(this.favors)
  }


  createFav(description, cost){
 
  this.createS.createFavor(description, cost).subscribe(e =>{
    this.newFavor = e
    console.log(this.newFavor);
    this.favors.push(this.newFavor)
    });
  };

  selectFavor(favor){
    this.selectedFavor = favor
  }
}
