import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserChatComponent } from './user-chat/user-chat.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserComponent },
  { path:'user/profile', component: UserProfileComponent},
  { path:'user/chat', component: UserChatComponent},
  // { path: '**', redirectTo: '' }, // Wildcard route for handling unknown paths
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   }
