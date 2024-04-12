import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  
    
  //get cols and data from components that use this component
  @Input() cols!: any[];
  @Input() data!: any[];

  fields: any[] = []

  ngOnInit(): void {
    this.fields = this.cols.map((col: any) => col.field);
  }


}
