import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { ExpressServiceService } from '../services/express-service.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.scss'
})
export class EventTableComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  cols: any[] = [
    // { field: 'RSOID', header: 'rsoid' },
    { field: 'EVENT_DESCR', header: 'event description' },
    { field: 'EID_DATE', header: 'event date' },
    { field: 'EVENT_CATEGORY', header: 'event category' },
    { field: 'LOCID', header: 'Location' }


  ];

  data: any[] = [];

  constructor(private expressService: ExpressServiceService) { }

  ngOnInit(){
    console.log('getting events');
    this.expressService.getEvents().subscribe((res: any) => {
      console.log(res)
      this.data = res;
    });
  }


  gOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
