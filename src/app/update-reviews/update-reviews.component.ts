import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ExpressServiceService } from '../services/express-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-reviews',
  standalone: true,
  imports: [ TableModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-reviews.component.html',
  styleUrl: './update-reviews.component.scss'
})
export class UpdateReviewsComponent implements OnInit{

  cols: any[] = [
    { field: 'comment', header: 'Review' },
    { field: 'rating', header: 'Rating' },
  ];
  data: any[] = [];
  

  
    constructor(private expressService: ExpressServiceService) { }
  
    ngOnInit(): void {
      console.log("getting user")
      this.expressService.getUserByToken().subscribe((res: any) => {
        console.log(res);
        this.expressService.getReviewsByUserId(res[0].USERID).subscribe((data: any) => {
          console.log(data);
          this.data = data;
        });
      });
    }
  
    updateReview(rowData: any){
      console.log("Updating Review");
      const postBody =
      {
        COMM_TEXT: rowData.COMM_TEXT,
        COMM_RATING: rowData.COMM_RATING,
        COMM_STATUS: rowData.COMM_STATUS
      };
  
      this.expressService.updateReview(postBody, rowData.COMM_ID).subscribe((data: any) => {
        console.log(data);
      });
    }

    deleteReview(rowData: any){
      console.log("Deleting Review");
      this.expressService.deleteReview(rowData.COMM_ID).subscribe((data: any) => {
        console.log(data);
      });
    }

}
