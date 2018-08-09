import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  id;
  chatBox:any;
  
  constructor(public sessionS: SessionService, public chatS: ChatService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) =>{
      this.id = params
    })
  }


  sendMessage(message){

    const id = this.id
    const myId = this.sessionS.user["_id"]
    this.chatS.sendMessageTo(message, id, myId)
  }
}
