import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiraService {

  private GetAiResponse = 'https://project-gimini-1.onrender.com/chat_with_mira';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get response from Mira
  get_response_from_mira(query: string) {
    console.log('Requesting AI response');

    const token = this.authService.getToken();
    const ques={
      "query":"3rd largest planet"
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // Format: Bearer <token>
    });

    // Prepare the query parameters
    const body = { query: query };
    // Make the HTTP GET request with the headers and parameters
    return this.http.post<any>(this.GetAiResponse, body, { headers });
  }
}
