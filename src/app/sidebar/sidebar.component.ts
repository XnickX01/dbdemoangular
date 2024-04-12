import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExpressServiceService } from '../services/express-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router, private expressService: ExpressServiceService ) { }
  ngOnInit(): void {
  
  }

  signOut(){
    console.log("Signing Out");
    localStorage.removeItem('token');
    this.expressService.userLoggedIn.next(false); // emit event
    window.location.reload();
    this.router.navigate(['/']);
  }
}
