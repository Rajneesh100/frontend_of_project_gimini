import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'https://project-gimini-1.onrender.com/signup';
  private loginUrl = 'https://project-gimini-1.onrender.com/login';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
    
  }

  constructor(private http: HttpClient) {}
  UserId:string='';
  UserName:string='';
  token:string='';

  // Method to call the signup API
  signup(signupData: any) {
    console.log('signup called');
    console.log(signupData);
    const response= this.http.post<any>(this.signupUrl, signupData);


    return response
  }

  

  // Method to call the login API
  login(loginData:any) {
    console.log('signup called');
    console.log(loginData);
    const response= this.http.post<any>(this.loginUrl, loginData);
    return response;
  }

  // Save JWT token to local storage
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
    this.token = token;  
    this.tokenSubject.next(token);
  }

  // Get token as observable
  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  // Fetch token from local storage
  getToken() {
    // return this.token;
    return localStorage.getItem('jwtToken');
  }

  // getToken() {
  //   if (typeof window !== 'undefined' && !!window.localStorage) {
  //     return localStorage.getItem('jwtToken');
  //   }
  //   return null; // Or provide some default value if applicable
  // }

 isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('jwtToken');
      return !!token;
    }
    return false; // Assume not authenticated if localStorage is not available
  }

  // Logout method to clear the token from localStorage
  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwtToken');
    }
  }
}
