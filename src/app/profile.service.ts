import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; // Make sure to import AuthService

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private GetProfileUrl = 'https://project-gimini-1.onrender.com/profile';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to call the profile API
  getprofile() {
    console.log('profile called');

    // Get the JWT token from AuthService
    const token = this.authService.getToken();

    // Add the token to the request headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Format: Bearer <token>
    });

    // Make the HTTP GET request with the headers
    return this.http.get<any>(this.GetProfileUrl, { headers });
  }
}
