import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ExpressServiceService } from '../services/express-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.scss'
})
export class CreateReviewComponent {

  cols: any[] = [
    { field: 'RSOID', header: 'rsoid' },
    { field: 'EVENT_DESCR', header: 'event description' },
    { field: 'EID_DATE', header: 'event date' },
    { field: 'EVENT_CATEGORY', header: 'event category' },
    { field: 'LOCID', header: 'Location' }


  ];
  data: any[] = [];
  reviewData: any[] = [];
  reviewCols: any[] = [
    { field: 'UID', header: 'User ID' },
    { field: 'EID', header: 'Event ID' },
    { field: 'REVIEW_DESCR', header: 'Review Description' },
    { field: 'REVIEW_RATING', header: 'Review Rating' }
  ];

  user: any;

  formGroup: FormGroup = new FormGroup({
    comment: new FormControl(''),
    rating: new FormControl(0)
  });

  isSelectedEvent: boolean = false;
  selectedEvent: any;
  
  constructor(private expressService: ExpressServiceService, private route: Router) {}

  ngOnInit() {
    console.log('getting events');
    this.expressService.getEvents().subscribe((res: any) => {
      console.log(res)
      this.data = res;
    });

    console.log('getting user');
    this.expressService.getUserByToken().subscribe((res: any) => {
      console.log(res);
      this.user = res;
    });
  
  }

  getReviews(event: any){
    console.log("Getting reviews");
    console.log(event.data.EID);
    this.selectedEvent = event.data;
    this.expressService.getReviewsbyEvent(event.data.EID).subscribe((data: any) => {
      console.log(data);
      this.reviewData = data;
      this.isSelectedEvent = true;
    });
  }

  onStarClick(rating: number) {
    if(this.formGroup.get('rating')?.value === rating){
      this.formGroup.get('rating')?.setValue(0);
    }else{
      this.formGroup.get('rating')?.setValue(rating);
  }
}

  onSubmitReview(){
    console.log("Submitting review");
    const postBody = {
      EID: this.selectedEvent.EID,
      COMMENT: this.formGroup.value.comment,
      RATING: this.formGroup.value.rating,
      USERID: this.user[0].USERID
    };
    this.expressService.addReview(postBody).subscribe((data: any) => {
      console.log(data);
      this.route.navigate(['/']);
    });
  }

  backToEvents(){
    this.isSelectedEvent = false;
    this.reviewData = [];
  }

}
