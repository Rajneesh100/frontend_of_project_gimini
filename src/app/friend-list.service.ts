import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FriendListService {


  private GetfriendListUrl = 'https://project-gimini-1.onrender.com/get_connection';
  private GetChatWithUser = 'https://project-gimini-1.onrender.com/get_my_chat_with';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get response from Mira
  getFriendList() {
    console.log('Requesting friend List response');
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });

    return this.http.get<any>(this.GetfriendListUrl,{ headers });
  }
  getChatWithUser(userId:any){
  
    console.log('Requesting friend List response');
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
    
    const body = { selected_user_id: userId};
    return this.http.post<any>(this.GetChatWithUser ,body, { headers });
  }
  sendMessageToUser(id:string,name:string, message:string) {
    console.log('send message to user');
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
    
    const body = { message_txt:message, send_to:name, send_to_id:id};
    return this.http.post<any>('https://project-gimini-1.onrender.com/send', body, { headers });
  }

}
