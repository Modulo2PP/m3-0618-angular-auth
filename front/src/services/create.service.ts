import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import { of } from "rxjs";

const { BASEURL } = environment;

interface UserObject {
  username: string;
}

@Injectable()
export class createService {
  groupData;
  favor

  data: any;

  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  createGroup(members:Array<string>, name:string) {
    console.log('hihi')
    return this.http.post(`${BASEURL}/api/news/group`,{members,name},this.options).pipe(
        map((res: Response) => {
          let data = res.json();
          this.groupData = data;
          return this.groupData;
        })
      );
  }

  createFavor(description, cost){
    return this.http.post(`${BASEURL}/api/news/favor`,{description,cost},this.options).pipe(
      map((res: Response) => {
        let data = res.json();
        this.favor = data;
        return this.favor;
      })
    );
  }
}
