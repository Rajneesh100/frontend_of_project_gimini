
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Import AuthService for login API call

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  loginform_reactive=new FormGroup({
    name:new FormControl('niti',[Validators.required]),
    username:new FormControl('niti',[Validators.required]),
    email:new FormControl('niti@gmail.com',[Validators.required, Validators.email]),
    password:new FormControl('123',[Validators.required, Validators.minLength(3)])
  })
  loginuser_reactive(){
    this.signupuser();
    console.log(this.loginform_reactive.value)
  }


  get user_name(){
    return this.loginform_reactive.get('username')
  }

  get pass_key(){
    return this.loginform_reactive.get('password')
  }
  
  get user(){
    return this.loginform_reactive.get('name');
  }
  get email(){
    return this.loginform_reactive.get('email');
  }

  UserId:string='';
  UserName:string='';
  constructor(private authService: AuthService, private router: Router) {} // Ensure AuthService is injected

  signupuser() {
    if (this.loginform_reactive.valid) {
      const loginData = this.loginform_reactive.value;
      this.authService.signup(loginData).subscribe(
        response => {
          const token = response.token;

          this.authService.UserId=response.userdata.id;
          this.authService.UserName=response.userdata.username;
          this.authService.saveToken(token);  // Save the JWT token
          console.log('sign up successful. JWT Token:', token);
          this.router.navigate(['/user']);  // Navigate to the user component
        },
        error => {
          console.error('sign up failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
