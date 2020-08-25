import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MissingRoutingModel} from '../models/missing-routing.model';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-result-routes',
  templateUrl: './masterdata-routes.component.html',
  styleUrls: ['./masterdata-routes.component.css']
})
export class MissingRoutesResultComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  routings: Array<MissingRoutingModel> = [];

  displayedColumns = ['trade', 'pol', 'pod', 'ts1', 'ts2', 'ts3', 'contractno', 'productno', 'partnercode', 'reasoncode'];
  dataSource: any;

  @ViewChild(MatSort, {static: true} as any) sort: MatSort;
  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    console.log('after view init');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log('init');

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes' + JSON.stringify(changes));
    this.dataSource = new MatTableDataSource(this.routings);
  }

}
