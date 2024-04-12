import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpressServiceService } from './services/express-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventTableComponent } from './event-table/event-table.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, SidebarComponent, SignInComponent, SignUpComponent, CommonModule, EventTableComponent ],
})
export class AppComponent implements OnInit {
  title = 'dbdemoapp';
  isLoggedIn: boolean = false; 
  constructor(private expressService: ExpressServiceService) {}

  ngOnInit() {
    this.expressService.userLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        // User is logged in, update the UI accordingly
        this.isLoggedIn = true;
      }
    });
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Add type assertion here
      console.log(decodedToken, token, 'decoded token', decodedToken.exp, Date.now() / 1000);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log('Token is expired.');
        this.isLoggedIn = false;
        this.expressService.userLoggedIn.next(false);
      } else {
        console.log('Token is not expired.');
        this.expressService.userLoggedIn.next(true);
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }
}
