import {Component, OnInit, ViewChild} from '@angular/core';
import {GeoScopeService} from '../../services/geoscope.service';

import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {GEOSCOPE_TEST_DATA} from '../../testdata/geoscopes';
import {GeoScopeModel} from '../../model/geoscope.model';

@Component({
  selector: 'app-geoscope.list.component',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.css']
})
export class GeoscopeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'code', 'action'];

  dataSource: Array<GeoScopeModel> = GEOSCOPE_TEST_DATA;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private masterDataService: GeoScopeService) {
  }

  ngOnInit(): void {

    console.log(JSON.stringify(this.dataSource));
  }


  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    console.log('Transmitted  ADD Data' + JSON.stringify(row_obj));

    this.dataSource.push(new GeoScopeModel(row_obj.id, row_obj.country, row_obj.code, row_obj.type, row_obj.name, row_obj.port));
    console.log('New Add data' + JSON.stringify(this.dataSource));

    this.table.renderRows();

  }

  updateRowData(row_obj: GeoScopeModel) {
    console.log('Transmitted Data COMPONENT' + JSON.stringify(row_obj));

    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.geoscope_id === row_obj.geoscope_id) {
        //   value=new  GeoScopeModel(row_obj.geoscope_id, row_obj.country_code, row_obj.location_code, row_obj.geoscope_type, row_obj.location_name, row_obj.is_port);
      }
      return true;
    });
  }

  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.geoscope_id != row_obj.id;
    });
  }

}
