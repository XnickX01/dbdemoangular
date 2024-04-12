import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpressServiceService } from '../services/express-service.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-rso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule],
  templateUrl: './create-rso.component.html',
  styleUrl: './create-rso.component.scss'
})
export class CreateRsoComponent implements OnInit{

  university: any[] = [];
  users: any[] = []; 

  formGroup: FormGroup = new FormGroup({
    rso: new FormControl(''),
    admin: new FormControl(''),
    university: new FormControl('')
  });

  constructor(private expressService: ExpressServiceService, private router: Router) { }


  ngOnInit(): void {
    this.expressService.getUniversity().subscribe((data: any) => {
      console.log(data);
      this.university = data;
    });

    this.expressService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  
  }


  createRSO(){
    console.log("Creating RSO");
    const postBody =
    {
      RSO_NAME: this.formGroup.value.rso,
      UID: this.formGroup.value.university.UID,
      RSO_STATUS: 'pending',
      RSO_ADMIN: this.formGroup.value.admin.USERID
    };

    this.expressService.addRSO(postBody).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }


}
