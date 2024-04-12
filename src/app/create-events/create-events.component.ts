import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { ExpressServiceService } from '../services/express-service.service';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-events',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, CardModule, CalendarModule, CommonModule],
  templateUrl: './create-events.component.html',
  styleUrl: './create-events.component.scss'
})
export class CreateEventsComponent implements OnInit{

  rso: any[] = [];
  locations: any[] = [];
  categories: any[] = ['public', 'private', 'rso'];

  formGroup: FormGroup = new FormGroup({
    rso: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    category: new FormControl('')
  });
  constructor(private expressService: ExpressServiceService, private router: Router) { } // Inject the ExpressServiceService

  ngOnInit(): void {
    this.expressService.getRSO().subscribe((data: any) => {
      console.log(data);
      this.rso = data;
    });

    this.expressService.getLocations().subscribe((data: any) => {
      console.log(data);
      this.locations = data;
    });


  }

  createEvent(){
    console.log("Creating event");
    let day = this.formGroup.value.date.getDate();

    //grab month from EID_DATE
    let month = this.formGroup.value.date.getMonth();

    //grab year from EID_DATE
    let year = this.formGroup.value.date.getFullYear();

    //grab hours from EID_DATE
    let hours = this.formGroup.value.date.getHours();

    //grab minutes from EID_DATE
    let minutes = this.formGroup.value.date.getMinutes();
    if(minutes < 10){
      minutes = "0" + minutes;
    }

    console.log(day, month, year, hours, minutes);

    let START_DATE = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":00";
    console.log(START_DATE);

    //end date is 1 hour after start date
    let END_DATE = year + "-" + month + "-" + day + " " + (hours + 1) + ":" + minutes + ":00";
    console.log(END_DATE);



    const postBody =
    {
      LOCID: this.formGroup.value.location.LOCID,
      EVENT_CATEGORY: this.formGroup.value.category,
      RSOID: this.formGroup.value.rso.RSOID,
      EVENT_DESCR: this.formGroup.value.description,
      EID_DATE: START_DATE,
      START_TIME: START_DATE,
      END_TIME: END_DATE
    };

    console.log(postBody.EID_DATE)


    this.expressService.addEvent(postBody).subscribe((data: any) => {
      console.log(data);
      // this.router.navigate(['/']);
    });
  }

  evenHour(){
    console.log("Even Hour");
    let date = this.formGroup.value.date;
    date.setMinutes(0, 0, 0);
    this.formGroup.value.date = date;
    }


}
