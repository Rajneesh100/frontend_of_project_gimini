import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'routing_blog';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  // {
  //   this.isLoggedIn = this.authService.isAuthenticated(); // Implement this logic in AuthService
  // }

  ngOnInit() {
    // Check the initial login status when the component is initialized
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  logout_user() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.cdr.detectChanges(); // Trigger change detection manually
    this.router.navigate(['']); // Navigate to the login page after logout
  }

  // Example login function for when login is successful
  onLoginSuccess() {
    this.isLoggedIn = true;
    this.cdr.detectChanges(); // Trigger change detection manually
  }


}

