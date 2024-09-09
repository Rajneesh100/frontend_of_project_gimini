import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileData: any = null; // Store the profile data here

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.Show_Profile(); // Fetch profile data when the component initializes
  }

  Show_Profile() {
    // Subscribe to the observable returned by getprofile()
    this.profileService.getprofile().subscribe(
      (data) => {
        this.profileData = data; // Assign profile data to the variable
        console.log('Profile data:', data); // Optional: log data to console
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}
