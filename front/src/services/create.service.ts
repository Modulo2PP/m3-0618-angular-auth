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
  newFavor;
  favors;
  group

  data: any;

  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  createGroup(members:Array<string>, name:string) {
    return this.http.post(`${BASEURL}/api/news/group`,{members,name},this.options).pipe(
        map((res: Response) => {
          let data = res.json();
          this.groupData = data;
          return this.groupData;
        })
      );
  }

  createFavor(description, cost, groupId){
    return this.http.post(`${BASEURL}/api/news/favor`,{description,cost, groupId},this.options).pipe(
      map((res: Response) => {
        let data = res.json();
        this.group = data;
        return this.group;
      })
    );
  }

}
