import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { NopageComponent } from './nopage/nopage.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NopageComponent,
    UserChatComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,ReactiveFormsModule ,FormsModule
  ],
  providers: [
    provideClientHydration(),

    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
