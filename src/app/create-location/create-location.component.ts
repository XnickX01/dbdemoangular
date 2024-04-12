import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpressServiceService } from '../services/express-service.service';


@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.scss'
})
export class CreateLocationComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    NAME: new FormControl(''),
    DESCR: new FormControl(''),
    LONGITUDE: new FormControl(''),
    LATITUDE: new FormControl('')
  });

  constructor(private expressService: ExpressServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  createLocation(){
    console.log("Creating Location");
    const postBody =
    {
      NAME: this.formGroup.value.NAME,
      DESCR: this.formGroup.value.DESCR,
      LONGITUDE: this.formGroup.value.LONGITUDE,
      LATITUDE: this.formGroup.value.LATITUDE
    };

    this.expressService.addLocation(postBody).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }

}
