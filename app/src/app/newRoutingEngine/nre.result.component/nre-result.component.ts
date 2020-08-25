import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewRoutingModel} from '../models/nre.model';
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-nre-result',
  templateUrl: './nre-result.component.html',
  styleUrls: ['./nre-result.component.css']
})
export class NewRoutingeEngineResultComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  routings: Array<NewRoutingModel> = [];

  displayedColumns = ['tt', 'pol', 'ts1', 'ts2', 'ts3', 'pod', 'prof-1', 'prof-2', 'prof-3', 'errorcode'];
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
