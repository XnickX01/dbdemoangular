import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpressServiceService } from '../services/express-service.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, DropdownModule, CardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  universites: any[] = [];

  roles: any[] = [
    {label: 'Student', value: 'student'},
    {label: 'Admin', value: 'admin'},
    {label: 'Super Admin', value: 'super_admin'}
  ];

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    phone: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    university: new FormControl('')
  });

  constructor(private expressService: ExpressServiceService, private router: Router) { }

  ngOnInit(): void {
    this.expressService.getUniversity().subscribe((data: any) => {
      console.log(data);
      this.universites = data;
    });
  }

  signUp(){
    console.log("Signing up");
    const postBody =
    {
      USERNAME: this.formGroup.value.username,
      EMAIL: this.formGroup.value.email,
      PASSWORD: this.formGroup.value.password,
      USER_PROFILE: this.formGroup.value.role.value,
      PHONE: this.formGroup.value.phone,
      FIRST_NAME: this.formGroup.value.first_name,
      LAST_NAME: this.formGroup.value.last_name,
      UID: this.formGroup.value.university.UID
    };

    this.expressService.signUp(postBody).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data);
      this.expressService.userLoggedIn.next(true); // emit event
      //route to home page
      this.router.navigate(['/']);
    });

  }

}
