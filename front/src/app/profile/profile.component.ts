import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { buscadorService } from "../../services/buscador.services";

const { BASEURL } = environment;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/auth/updatepic`,
    method: "POST"
  });

  feedback;
  user:any;
  haberes;
  email:any;
  estatus:any;
  UserObject:any;


  constructor(public sessionService: SessionService, public router: Router, public buscarS: buscadorService) {
    this.sessionService.isLogged().subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };

    this.buscarS.buscarHaberes(this.sessionService.user["_id"]).subscribe(e=>{
      console.log("entra")
      this.haberes = e
    })
  }

  update() {
    if (this.uploader.queue.length === 0) {
      // console.log(this.userId);
      this.sessionService
        .update(this.user)
        .subscribe();
    } else {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append("username", this.user.username);
        form.append("password", this.user.password);
        form.append("email", this.user.email);
        form.append("estatus", this.user.estatus);
        form.append("_id", this.user._id);

      };
      console.log(this.uploader.queue)
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
        this.router.navigate(['/']);
      };
    }
  }
}
