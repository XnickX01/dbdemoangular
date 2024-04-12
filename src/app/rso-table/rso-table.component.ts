import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { ExpressServiceService } from '../services/express-service.service';

@Component({
  selector: 'app-rso-table',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './rso-table.component.html',
  styleUrl: './rso-table.component.scss',
})
export class RsoTableComponent implements OnInit {
  cols: any[] = [
    // { field: 'RSOID', header: 'RSOID' },
    { field: 'RSO_ADMIN', header: 'RSO_ADMIN' },
    { field: 'RSO_NAME', header: 'RSO_NAME' },
    { field: 'RSO_STATUS', header: 'RSO_STATUS' },
    { field: 'UID', header: 'UID' },
  ];



  data: any[] = [];

  constructor(private expressService: ExpressServiceService) {}

  ngOnInit(): void {
    console.log('getting rsos');
    this.expressService.getRSO().subscribe((res: any) => {
      console.log(res);
      this.data = res;
    });
    }
  }

