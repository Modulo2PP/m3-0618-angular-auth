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
  debts;
  balanceHaberes;
  balanceDeudas;
  getUser;
  groupsOfUser;
  getall;
  totalHaberes

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

  buscarBalanceHaberes(id, idUsuaario){
    return this.http.get(`${BASEURL}/api/news/balanceHaberes/${id}/${idUsuaario}`, this.options).pipe(
      map( (res:Response) => {
        this.balanceHaberes = res.json();
        console.log(this.balanceHaberes, "este es el console del servicio")
        return this.balanceHaberes;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
    
  }

  buscarBalanceDeudas(id, idUsuario){

    return this.http.get(`${BASEURL}/api/news/balanceDeudas/${id}/${idUsuario}`, this.options).pipe(
      map( (res:Response) => {
        this.balanceDeudas = res.json();
        return this.balanceDeudas;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
    
  }

  getProfile(id){
    return this.http.get(`${BASEURL}/api/news/getprofile/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.getUser = res.json();
        return this.getUser;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
  }
  
  getGroups(id){
    return this.http.get(`${BASEURL}/api/news/getgroups/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.groupsOfUser = res.json();
        return this.groupsOfUser;
      }),
      catchError(e => {console.log("algo ha ido mal"); return of(e)})
    );
  }

  getAll(){
    return this.http.get(`${BASEURL}/api/news/getall/`, this.options).pipe(
      map( (res:Response) => {
        this.getall = res.json();
        return this.getall;
      }),
    )
  }

  buscarHaberes(id){
    return this.http.get(`${BASEURL}/api/news/buscarhaberes/${id}`, this.options).pipe(
      map( (res:Response) => {
        this.totalHaberes = res.json();
        return this.totalHaberes;
      }),
    )
  }
}
