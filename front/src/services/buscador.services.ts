import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;

interface UserObject{
  username:string,
}


@Injectable()
export class buscadorService {

  data:any;
  mygroups:any
  groupInfo;
  eachgroup;
  debts

  options:object = {withCredentials:true};

  constructor(private http:Http) {}


  buscar(pattern){
    return this.http.get(`${BASEURL}/api/news/search/${pattern}`,this.options).pipe(
      map( (res:Response) => {
        this.data = res.json();
        return this.data;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
  }

  buscarGrupos(id){
    return this.http.get(`${BASEURL}/api/news/mygroups/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.mygroups = res.json();
        return this.mygroups;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
  }

  mygroup(id){
    return this.http.get(`${BASEURL}/api/news/mygroup/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.eachgroup = res.json();
        return this.eachgroup;
      }),
    )
  }

  buscarDeuda(id){
    return this.http.get(`${BASEURL}/api/news/debt/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.debts = res.json();
        return this.debts;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
    
  }

}
