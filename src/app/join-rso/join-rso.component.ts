import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ExpressServiceService } from '../services/express-service.service';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule }    from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-join-rso',
  standalone: true,
  imports: [TableModule, CommonModule, CheckboxModule, FormsModule],
  templateUrl: './join-rso.component.html',
  styleUrl: './join-rso.component.scss'
})
export class JoinRsoComponent implements OnInit{

  user: any;
  rso: any[] = [];
  cols: any[] = [
    { field: 'RSO_ADMIN', header: 'RSO_ADMIN' },
    { field: 'RSO_NAME', header: 'RSO_NAME' },
    { field: 'RSO_STATUS', header: 'RSO_STATUS' },
    { field: 'UID', header: 'UID' },
  ];

  constructor(private expressService: ExpressServiceService) { }

  ngOnInit(): void {

    //get user info
    this.expressService.getUserByToken().subscribe((res: any) => {
      console.log(res);
      this.user =  res;

      //get rso by university id
      console.log(this.user[0].UID)
      this.expressService.getRSOByUniversityIdAndUser(res[0].UID, this.user[0].USERID).subscribe((rso: any) => {
        this.rso = rso.map((rso: any) => {
          console.log(rso.IS_MEMBER);
          if(rso.IS_MEMBER == 1 ){
            rso.IS_MEMBER = true;
          }else{
            rso.IS_MEMBER = false;
          }
          return rso;
        }
        );
      });
    });
  }

  joinRSO(event: any, rowdata: any){
    console.log(event.checked);
    if(event.checked === true){
    console.log("Joining RSO");
    const postBody =
    {
      RSOID: rowdata.RSOID,
      USERID: this.user[0].USERID
    };
    console.log(postBody);

    this.expressService.joinRSO(postBody).subscribe((data: any) => {
      console.log(data);
    });
  }else{
    console.log("Leaving RSO");
    const postBody =
    {
      RSOID: rowdata.RSOID,
    };
    console.log(postBody);
    console.log(this.user[0].USERID);
    this.expressService.leaveRSO(this.user[0].USERID, postBody).subscribe((data: any) => {
      console.log(data);
    });
  }
}




}
