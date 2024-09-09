
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Import AuthService for login API call
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginform=new FormGroup({
    username:new FormControl('niti',[Validators.required]),

    // user:new FormControl('obub@gmail.com',[Validators.required, Validators.pattern('[a-zA-Z]+[0-9]+@ +[a-zA-Z]+.+[a-zA-Z]')]),
    password:new FormControl('123',[Validators.required, Validators.minLength(3)])
  })
  get user_name(){
    return this.loginform.get('username')
  }

  get pass_key(){
    return this.loginform.get('password')
  }




  constructor(private authService: AuthService, private router: Router,private appComponent: AppComponent) {} // Ensure AuthService is injected

  loginuser() {
    if (this.loginform.valid) {
      const loginData = this.loginform.value;
      console.log(loginData)
      this.authService.login(loginData).subscribe(
        response => {
          const token = response.token;
          this.authService.UserId=response.userdata.id;
          this.authService.UserName=response.userdata.username;
          this.authService.saveToken(token);  // Save the JWT token
          console.log('Login successful. JWT Token:', token);
          this.appComponent.onLoginSuccess() ;
          this.router.navigate(['/user']);  // Navigate to the user component
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
