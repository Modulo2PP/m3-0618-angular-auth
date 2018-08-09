import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { MygroupsComponent } from './mygroups/mygroups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { EachGroupComponent } from './each-group/each-group.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path:'profile', component: ProfileComponent},
  { path:'inicio', component: InicioComponent},
  { path:'my-groups', component: MygroupsComponent},
  { path:'create-groups', component: CreategroupComponent},
  { path:'my-group/:id', component: EachGroupComponent},
  { path:'userinfo/:id', component: UserinfoComponent},
  { path:'chat/:id', component: ChatComponent},

];
