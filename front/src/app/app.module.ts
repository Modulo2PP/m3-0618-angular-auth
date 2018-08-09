import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { MygroupsComponent } from './mygroups/mygroups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { buscadorService } from '../services/buscador.services';
import { createService } from '../services/create.service';
import { EachGroupComponent } from './each-group/each-group.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ChatService } from '../services/chat.service';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HomeComponent,
    InicioComponent,
    MygroupsComponent,
    CreategroupComponent,
    EachGroupComponent,
    UserinfoComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [SessionService, buscadorService, createService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
