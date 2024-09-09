import { Component } from '@angular/core';
import { MiraService } from '../mira.service';
import { FriendListService } from '../friend-list.service';
import { AuthService } from '../auth.service';
import { timestamp } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent  {


  constructor(private miraService: MiraService ,private FriendListService :FriendListService , private authService:AuthService
  ) {}



  UserName:string='';
  UserId:string='';

  ngOnInit() {

    this.getconnection(); // Fetch profile data when the component initializes
    this.UserId = this.authService.UserId;
    this.UserName = this.authService.UserName;

  }





  FriendList: any[] = [];
  selectedUser: any = null;
  chatMessages: any[] = [];

  getconnection() {
    this.FriendListService.getFriendList().subscribe(
      (data: any) => { // Ensure that data is treated as an array
        this.FriendList = data.response;
        console.log(this.FriendList);
      },
      (error) => {
        console.error('Error fetching friend list:', error);
      }
    );
  }

  aiResponse: string='';











  getClass(senderId: string): string {
    return senderId === this.UserId ? 'message-right' : 'message-left';
  }











  async fetchAiResponse(query: string) {
    console.log("AI called");
    const new_message = {
      text: query,
      reciever: "gemini", 
      reciever_id: "66dd5c0e98d06d854834d5ab",
      sender: this.UserName, 
      sender_id: this.UserId,  // Assuming UserId and UserName are stored in AuthService
      timestamp: new Date(),
      _id: '',
      __v: 0
    };
  
    // Push user query message to chat
    this.chatMessages.push(new_message);
  
    try {
      // Wait for the AI response
      const response = await firstValueFrom(this.miraService.get_response_from_mira(query));
      this.aiResponse = response.response; // Update aiResponse with API result
      console.log('AI Response:', this.aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      this.aiResponse = "Unable to fetch AI response";
    }
  
    // Prepare and push AI response message
    const new_reply = {
      text: this.aiResponse, 
      sender: "gemini", 
      sender_id: "66dd5c0e98d06d854834d5ab",
      reciever: this.UserName, 
      reciever_id: this.UserId,  // Assuming UserId and UserName are stored in AuthService
      timestamp: new Date(),
      _id: '',
      __v: 0
    };
    this.chatMessages.push(new_reply);
  }












































  GetChat(userId: string) {
    this.selectedUser = this.FriendList.find(friend => friend.id === userId);
    console.log(this.selectedUser.id, this.selectedUser.name, this.selectedUser.name);

    this.FriendListService.getChatWithUser(this.selectedUser.id).subscribe(
      (data: any) => {
        this.chatMessages = data.response; // Assuming the response contains a 'messages' array
        console.log(this.chatMessages)
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );  
  }


  sendMessage(message: string) {
    console.log(message, this.selectedUser.name, this.selectedUser.id)

    if(this.selectedUser.name==="gemini"){
      this.fetchAiResponse(message);      
    }else{
      
      this.FriendListService.sendMessageToUser(this.selectedUser.id,this.selectedUser.name, message).subscribe(
      (response: any) => {
          const new_message = 
          { 
            text:message, 
            reciever:this.selectedUser.name, 
            reciever_id:this.selectedUser.id,
            sender:response.savedMessage.sender, 
            sender_id:response.savedMessage.sender_id,  // Assuming UserId and UserName are stored in AuthService
            timestamp:new Date(),
            "_id":'',
            "__v":0
          };
          
          this.chatMessages.push(new_message);
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }



  }
  



}
