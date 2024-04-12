import { Component, OnInit } from '@angular/core';
import { ExpressServiceService } from '../services/express-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-create-university',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule],
  templateUrl: './create-university.component.html',
  styleUrl: './create-university.component.scss'
})
export class CreateUniversityComponent implements OnInit {

  locations: any[] = [];

  formGroup: FormGroup = new FormGroup({
    university: new FormControl(''),
    location: new FormControl(''),
    domain: new FormControl('')
  });

  constructor(private expressService: ExpressServiceService, private router: Router) { }

  ngOnInit(): void {

    this.expressService.getLocations().subscribe((data: any) => {
      console.log(data);
      this.locations = data;
    });

  }

  createUniversity(){
    console.log("Creating University");
    const postBody =
    {
      UNIV_NAME: this.formGroup.value.university,
      LOCID: this.formGroup.value.location.LOCID,
      EMAIL_DOMAIN: this.formGroup.value.domain
    };

    this.expressService.addUniversity(postBody).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }

}
