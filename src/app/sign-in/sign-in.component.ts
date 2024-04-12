import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ExpressServiceService } from '../services/express-service.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  constructor(private expressService: ExpressServiceService, private router: Router) { }

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  login(){
    console.log("Logging in");
    this.expressService.logIn(this.formGroup.value.username, this.formGroup.value.password).subscribe((data: any) => {
      console.log(data, data.message);
      if(data.message === 'User not found'){
        alert('User not found');
        return;
      }
      localStorage.setItem('token', data.token);
      this.expressService.userLoggedIn.next(true); // emit event
      //route to home page
      this.router.navigate(['/']);

    });
  }


}
